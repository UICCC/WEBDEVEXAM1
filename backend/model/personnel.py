from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
from typing import Optional
import bcrypt

PersonnelRouter = APIRouter(tags=["Personnel"])

class PersonnelCreate(BaseModel):
    personnelID: int
    personnelName: str
    PersonnelPass: str

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

@PersonnelRouter.get("/personnel/", response_model=list)
async def read_personnel(db = Depends(get_db)):
    query = "SELECT * FROM personnel"
    db[0].execute(query)
    personnel = db[0].fetchall()
    return personnel

@PersonnelRouter.get("/personnel/{personnelID}", response_model=dict)
async def read_single_personnel(personnelID: int, db = Depends(get_db)):
    query = "SELECT personnelID, PersonnelPass, personnelName FROM personnel WHERE personnelID = %s"
    db[0].execute(query, (personnelID,))
    personnel = db[0].fetchone()
        
    if personnel:
            return {
                "personnelID": personnel['personnelID'],
                "PersonnelPass": personnel['PersonnelPass'],
                "personnelName": personnel['personnelName'],
            }
    else:
            raise HTTPException(status_code=404, detail="User not found")

@PersonnelRouter.post("/personnel/")
async def create_personnel(personnel: PersonnelCreate, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute(
        "INSERT INTO personnel (personnelID, PersonnelPass, personnelName) VALUES (%s, %s, %s)",
        (personnel.personnelID, personnel.PersonnelPass, personnel.personnelName)
    )
    db_connection.commit()
    db_connection.close()
    return personnel.dict()

@PersonnelRouter.put("/personnel/{personnelID}")
async def update_personnel(personnelID: int, PersonnelPass: str = Form(...), personnelName: str = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE personnel SET PersonnelPass = %s, personnelName = %s WHERE personnelID = %s", (PersonnelPass, personnelName, personnelID))
    db_connection.commit()
    db_connection.close()
    return {"personnelID": personnelID, "PersonnelPass": PersonnelPass, "personnelName": personnelName}

@PersonnelRouter.delete("/personnel/{personnelID}")
async def delete_personnel(personnelID: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM personnel WHERE personnelID = %s", (personnelID,))
    db_connection.commit()
    db_connection.close()
    return {"message": "Personnel deleted successfully"}
