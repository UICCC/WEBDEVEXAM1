from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
from typing import Optional
import bcrypt

# Create an instance of APIRouter
BorrowersRouter = APIRouter(tags=["Borrowers"])

# Password hashing function
def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Define a Borrower model
class Borrower(BaseModel):
    borrower_id: int
    borrower_name: str
    borrower_email: str
    subject: Optional[str] = None
    course: Optional[str] = None

# Define CRUD operations for Borrowers
@BorrowersRouter.get("/borrowers/", response_model=list)
async def read_borrowers(db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("SELECT * FROM borrower")
    borrowers = cursor.fetchall()
    db_connection.close()  # Close the connection
    return borrowers

@BorrowersRouter.get("/borrowers/{borrower_id}", response_model=Borrower)
async def read_borrower(borrower_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("SELECT * FROM borrower WHERE borrower_id = %s", (borrower_id,))
    borrower = cursor.fetchone()
    db_connection.close()  # Close the connection
    if borrower is None:
        raise HTTPException(status_code=404, detail="Borrower not found")
    return borrower

@BorrowersRouter.post("/borrowers/", response_model=Borrower)
async def create_borrower(email: str = Form(...), borrower_name: str = Form(...), borrower_email: str = Form(...), subject: str = Form(None), course: str = Form(None), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO borrower (email, borrower_name, borrower_email, subject, course) VALUES (%s, %s, %s, %s, %s)", (email, borrower_name, borrower_email, subject, course))
    db_connection.commit()
    new_borrower_id = cursor.lastrowid
    db_connection.close()  # Close the connection
    new_borrower = Borrower(borrower_id=new_borrower_id, borrower_name=borrower_name, borrower_email=borrower_email, subject=subject, course=course)
    return new_borrower

@BorrowersRouter.put("/borrowers/{borrower_id}", response_model=Borrower)
async def update_borrower(borrower_id: int, email: str = Form(...), borrower_name: str = Form(...), borrower_email: str = Form(...), subject: str = Form(None), course: str = Form(None), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE borrower SET email = %s, borrower_name = %s, borrower_email = %s, subject = %s, course = %s WHERE borrower_id = %s", (email, borrower_name, borrower_email, subject, course, borrower_id))
    db_connection.commit()
    db_connection.close()  # Close the connection
    return {"message": "Borrower updated successfully"}

@BorrowersRouter.delete("/borrowers/{borrower_id}")
async def delete_borrower(borrower_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM borrower WHERE borrower_id = %s", (borrower_id,))
    db_connection.commit()
    db_connection.close()  # Close the connection
    return {"message": "Borrower deleted successfully"}