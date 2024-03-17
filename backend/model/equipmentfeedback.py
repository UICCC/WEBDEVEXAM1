from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel

EquipmentFeedbackRouter = APIRouter(tags=["Equipment Feedback"])

class EquipmentFeedback(BaseModel):
    feedback_id: int
    feedback_desc: str

@EquipmentFeedbackRouter.get("/equipment-feedback/", response_model=list)
async def read_equipment_feedback(db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM equipment_feedback")
    return [EquipmentFeedback(**feedback) for feedback in cursor.fetchall()]

@EquipmentFeedbackRouter.get("/equipment-feedback/{feedback_id}", response_model=EquipmentFeedback)
async def read_single_equipment_feedback(feedback_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM equipment_feedback WHERE feedback_id = %s", (feedback_id,))
    feedback = cursor.fetchone()
    if not feedback:
        raise HTTPException(status_code=404, detail="Equipment Feedback not found")
    return EquipmentFeedback(**feedback)

@EquipmentFeedbackRouter.post("/equipment-feedback/", response_model=EquipmentFeedback)
async def create_equipment_feedback(feedback_desc: str, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO equipment_feedback (feedback_desc) VALUES (%s)", (feedback_desc,))
    db_connection.commit()
    feedback_id = cursor.lastrowid
    return EquipmentFeedback(feedback_id=feedback_id, feedback_desc=feedback_desc)

@EquipmentFeedbackRouter.put("/equipment-feedback/{feedback_id}", response_model=EquipmentFeedback)
async def update_equipment_feedback(feedback_id: int, feedback_desc: str, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE equipment_feedback SET feedback_desc = %s WHERE feedback_id = %s", (feedback_desc, feedback_id))
    db_connection.commit()
    return EquipmentFeedback(feedback_id=feedback_id, feedback_desc=feedback_desc)

@EquipmentFeedbackRouter.delete("/equipment-feedback/{feedback_id}")
async def delete_equipment_feedback(feedback_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM equipment_feedback WHERE feedback_id = %s", (feedback_id,))
    db_connection.commit()
    return {"message": "Equipment Feedback deleted successfully"}
