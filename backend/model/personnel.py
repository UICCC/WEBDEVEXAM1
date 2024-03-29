from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel

PersonnelRouter = APIRouter(tags=["Personnel"])

class Personnel(BaseModel):
    personnel_id: int
    personnel_name: str

@PersonnelRouter.get("/personnel/", response_model=list)
async def read_personnel(db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM personnel")
    return [Personnel(**personnel) for personnel in cursor.fetchall()]

@PersonnelRouter.get("/personnel/{personnel_id}", response_model=Personnel)
async def read_single_personnel(personnel_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM personnel WHERE personnel_id = %s", (personnel_id,))
    personnel = cursor.fetchone()
    if not personnel:
        raise HTTPException(status_code=404, detail="Personnel not found")
    return Personnel(**personnel)

@PersonnelRouter.post("/personnel/", response_model=Personnel)
async def create_personnel(personnel_name: str, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO personnel (personnel_name) VALUES (%s)", (personnel_name,))
    db_connection.commit()
    personnel_id = cursor.lastrowid
    return Personnel(personnel_id=personnel_id, personnel_name=personnel_name)

@PersonnelRouter.put("/personnel/{personnel_id}", response_model=Personnel)
async def update_personnel(personnel_id: int, personnel_name: str, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE personnel SET personnel_name = %s WHERE personnel_id = %s", (personnel_name, personnel_id))
    db_connection.commit()
    return Personnel(personnel_id=personnel_id, personnel_name=personnel_name)

@PersonnelRouter.delete("/personnel/{personnel_id}")
async def delete_personnel(personnel_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM personnel WHERE personnel_id = %s", (personnel_id,))
    db_connection.commit()
    return {"message": "Personnel deleted successfully"}
