from fastapi import Depends, HTTPException, APIRouter
from .db import get_db
from typing import List
from pydantic import BaseModel
import bcrypt

EquipmentSetRouter = APIRouter(tags=["EquipmentSet"])

class EquipmentSetCreate(BaseModel):
    equipmentID: int
    equipmentsetID: int

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

@EquipmentSetRouter.post("/equipmentset", response_model=int)
async def create_equipment_set(equipment_ids: List[int], db = Depends(get_db)):
    try:
        cursor, db_connection = db
        equipment_set_id = None  

        for equipment_id in equipment_ids:
            # Check if equipment exists
            query = f"SELECT equipmentID FROM equipment WHERE equipmentID = {equipment_id}"
            cursor.execute(query)

            if cursor.rowcount == 1:
                # Query the maximum equipmentsetID from the equipmentsetid table
                max_equipment_set_id_query = "SELECT MAX(equipmentsetID) FROM equipmentsetid"
                cursor.execute(max_equipment_set_id_query)
                max_equipment_set_id = cursor.fetchone()[0]

                # Determine the new equipmentsetID
                new_equipment_set_id = max_equipment_set_id + 1 if max_equipment_set_id is not None else 1

                # Iterate over each equipment ID and insert it with the new equipmentsetID
                for equipment_id in equipment_ids:
                    query = "INSERT INTO equipmentsetid (equipmentsetID, equipmentID) VALUES (%s, %s)"
                    cursor.execute(query, (new_equipment_set_id, equipment_id,))
                
                # Set equipment_set_id only if it has been successfully set
                equipment_set_id = new_equipment_set_id

                # If equipment_set_id is set, break out of the loop
                break

        return equipment_set_id

    finally:
        db_connection.close()
