from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
from typing import Optional
import bcrypt
import logging


BorrowersRouter = APIRouter(tags=["Borrowers"])

class BorrowerCreate(BaseModel):
    borrowerID: int
    BorrowerPass: str
    borrowerName: str
    borrowerEmail: str
    course: Optional[str] = None

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')




@BorrowersRouter.get("/borrowers/", response_model=list)
async def read_borrowers(db = Depends(get_db)):
    query = "SELECT * FROM borrower"
    db[0].execute(query)
    borrowers = db[0].fetchall()
    return borrowers


@BorrowersRouter.get("/borrowers/{borrowerID}", response_model=dict)
async def read_borrower(borrowerID: int, db=Depends(get_db)):

        query = "SELECT borrowerID, BorrowerPass, borrowerName, borrowerEmail, course FROM borrower WHERE borrowerID = %s"
        db[0].execute(query, (borrowerID,))
        borrower = db[0].fetchone()
        
        if borrower:
            return {
                "borrowerID": borrower['borrowerID'],
                "BorrowerPass": borrower['BorrowerPass'],
                "borrowerName": borrower['borrowerName'],
                "borrowerEmail": borrower['borrowerEmail'],
                "course": borrower['course'],
            }
        else:
            raise HTTPException(status_code=404, detail="User not found")

@BorrowersRouter.post("/borrowers/")
async def create_borrower(borrower: BorrowerCreate, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute(
        "INSERT INTO borrower (borrowerID, BorrowerPass, borrowerName, borrowerEmail, course) VALUES ( %s, %s, %s, %s, %s)",
        (borrower.borrowerID, borrower.BorrowerPass, borrower.borrowerName, borrower.borrowerEmail, borrower.course)
    )
    db_connection.commit()
    db_connection.close()
    return borrower.dict()  # Return the inserted borrower data


@BorrowersRouter.put("/borrowers/{borrowerID}")
async def update_borrower(borrowerID: int, BorrowerPass: str = Form(...), borrowerName: str = Form(...), borrowerEmail: str = Form(...), course: str = Form(None), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE borrower SET BorrowerPass = %s, borrowerName = %s, borrowerEmail = %s, course = %s WHERE borrowerID = %s", (BorrowerPass, borrowerName, borrowerEmail, course, borrowerID))
    db_connection.commit()
    db_connection.close()
    return {"borrowerID": borrowerID, "BorrowerPass": BorrowerPass, "borrowerName": borrowerName, "borrowerEmail": borrowerEmail, "course": course}


@BorrowersRouter.delete("/borrowers/{borrowerID}")
async def delete_borrower(borrowerID: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM borrower WHERE borrowerID = %s", (borrowerID,))
    db_connection.commit()
    db_connection.close()
    return {"message": "Borrower deleted successfully"}
