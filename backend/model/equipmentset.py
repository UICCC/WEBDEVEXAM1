from fastapi import Depends, HTTPException, APIRouter
from .db import get_db
from pydantic import BaseModel

EquipmentSetRouter = APIRouter(tags=["Equipment Set"])

class EquipmentSet(BaseModel):
    equipmentset_id: int
    equipment_id: int

@EquipmentSetRouter.get("/equipmentset/", response_model=list)
async def read_equipment_set(db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM equipment_set")
    return [EquipmentSet(**equipmentset) for equipmentset in cursor.fetchall()]

@EquipmentSetRouter.get("/equipmentset/{equipmentset_id}", response_model=EquipmentSet)
async def read_single_equipment_set(equipmentset_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM equipment_set WHERE equipmentset_id = %s", (equipmentset_id,))
    equipmentset = cursor.fetchone()
    if not equipmentset:
        raise HTTPException(status_code=404, detail="Equipment Set not found")
    return EquipmentSet(**equipmentset)

@EquipmentSetRouter.post("/equipmentset/", response_model=EquipmentSet)
async def create_equipment_set(equipment_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO equipment_set (equipment_id) VALUES (%s)", (equipment_id,))
    db_connection.commit()
    equipmentset_id = cursor.lastrowid
    return EquipmentSet(equipmentset_id=equipmentset_id, equipment_id=equipment_id)

@EquipmentSetRouter.put("/equipmentset/{equipmentset_id}", response_model=EquipmentSet)
async def update_equipment_set(equipmentset_id: int, equipment_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE equipment_set SET equipment_id = %s WHERE equipmentset_id = %s", (equipment_id, equipmentset_id))
    db_connection.commit()
    return EquipmentSet(equipmentset_id=equipmentset_id, equipment_id=equipment_id)

@EquipmentSetRouter.delete("/equipmentset/{equipmentset_id}")
async def delete_equipment_set(equipmentset_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM equipment_set WHERE equipmentset_id = %s", (equipmentset_id,))
    db_connection.commit()
    return {"message": "Equipment Set deleted successfully"}
