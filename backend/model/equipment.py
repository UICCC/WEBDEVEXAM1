from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
import bcrypt
import logging
logger = logging.getLogger(__name__)

# Create an instance of APIRouter
EquipmentRouter = APIRouter(tags=["Equipment"])

# Define an Equipment model
class Equipment(BaseModel):
    equipment_id: int
    equipment_name: str
    equipment_desc: str
    equipment_borrow_status: bool

# Define CRUD operations for Equipment
@EquipmentRouter.get("/equipment/", response_model=list)
async def read_equipment(db = Depends(get_db)):
    cursor, db_connection = db
    try:
        cursor.execute("SELECT * FROM equipment")
        equipment_records = cursor.fetchall()
        return equipment_records
    finally:
        db_connection.close()

@EquipmentRouter.get("/equipment/{equipment_id}", response_model=Equipment)
async def read_single_equipment(equipment_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM equipment WHERE equipment_id = %s", (equipment_id,))
    equipment = cursor.fetchone()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return Equipment(**equipment)

@EquipmentRouter.post("/equipment/", response_model=Equipment)
async def create_equipment(
    equipment_name: str = Form(...),
    equipment_desc: str = Form(...),
    equipment_borrow_status: bool = Form(...),
    db = Depends(get_db)
):
    cursor, db_connection = db
    cursor.execute("INSERT INTO equipment (equipment_name, equipment_desc, equipment_borrow_status) VALUES (%s, %s, %s)", (equipment_name, equipment_desc, equipment_borrow_status))
    db_connection.commit()
    equipment_id = cursor.lastrowid
    return Equipment(equipment_id=equipment_id, equipment_name=equipment_name, equipment_desc=equipment_desc, equipment_borrow_status=equipment_borrow_status)

@EquipmentRouter.put("/equipment/{equipment_id}", response_model=Equipment)
async def update_equipment(
    equipment_id: int,
    equipment_name: str = Form(...),
    equipment_desc: str = Form(...),
    equipment_borrow_status: bool = Form(...),
    db = Depends(get_db)
):
    cursor, db_connection = db
    cursor.execute("UPDATE equipment SET equipment_name = %s, equipment_desc = %s, equipment_borrow_status = %s WHERE equipment_id = %s", (equipment_name, equipment_desc, equipment_borrow_status, equipment_id))
    db_connection.commit()
    return Equipment(equipment_id=equipment_id, equipment_name=equipment_name, equipment_desc=equipment_desc, equipment_borrow_status=equipment_borrow_status)

@EquipmentRouter.delete("/equipment/{equipment_id}")
async def delete_equipment(equipment_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM equipment WHERE equipment_id = %s", (equipment_id,))
    db_connection.commit()
    return {"message": "Equipment deleted successfully"}
