from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
from typing import Optional
import bcrypt

# Create an instance of APIRouter
EquipmentRouter = APIRouter(tags=["Equipment"])

# Define an Equipment model
class EquipmentCreate(BaseModel):
    equipmentID: int
    equipmentName: str
    equipmentDesc: str
    equipmentBorrowStatus: bool

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Define CRUD operations for Equipment
@EquipmentRouter.get("/equipment/", response_model=list)
async def read_equipment(db = Depends(get_db)):
    query = "SELECT * FROM equipment"
    db[0].execute(query)
    equipment = db[0].fetchall()
    return equipment

@EquipmentRouter.get("/equipment/{equipmentID}", response_model=dict)
async def read_single_equipment(equipmentID: int, db = Depends(get_db)):
    query = "SELECT equipmentID, equipmentName, equipmentDesc, equipmentBorrowStatus FROM equipment WHERE equipmentID = %s"
    db[0].execute(query, (equipmentID,))
    equipment = db[0].fetchone()
        
    if equipment:
            return {
                "equipmentID": equipment['equipmentID'],
                "equipmentName": equipment['equipmentName'],
                "equipmentDesc": equipment['equipmentDesc'],
                "equipmentBorrowStatus": equipment['equipmentBorrowStatus'],
            }
    else:
            raise HTTPException(status_code=404, detail="User not found")

@EquipmentRouter.post("/equipment/")
async def create_equipment(equipment: EquipmentCreate, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute(
        "INSERT INTO equipment (equipmentID, equipmentName, equipmentDesc, equipmentBorrowStatus) VALUES (%s, %s, %s, %s)",
        (equipment.equipmentID, equipment.equipmentName, equipment.equipmentDesc, equipment.equipmentBorrowStatus)
    )
    db_connection.commit()
    db_connection.close()
    return equipment.dict()

@EquipmentRouter.put("/equipment/{equipmentID}")
async def update_equipment(equipmentID: int, equipmentName: str = Form(...), equipmentDesc: str = Form(...), equipmentBorrowStatus: bool = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE equipment SET equipmentName = %s, equipmentDesc = %s, equipmentBorrowStatus = %s WHERE equipmentID = %s", (equipmentName, equipmentDesc, equipmentBorrowStatus, equipmentID))
    db_connection.commit()
    db_connection.close()
    return {"equipmentID": equipmentID, "equipmentName": equipmentName, "equipmentDesc": equipmentDesc, "equipmentBorrowStatus": equipmentBorrowStatus}

@EquipmentRouter.delete("/equipment/{equipmentID}")
async def delete_equipment(equipmentID: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM equipment WHERE equipmentID = %s", (equipmentID,))
    db_connection.commit()
    db_connection.close()
    return {"message": "Equipment deleted successfully"}
