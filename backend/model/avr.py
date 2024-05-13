from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
from typing import Optional
import bcrypt
import logging


AvrRouter = APIRouter(tags=["AVR"])


def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

@AvrRouter.get("/avr/", response_model=list)
async def read_avr(db = Depends(get_db)):
    query = "SELECT * FROM avr"
    db[0].execute(query)
    avr = db[0].fetchall()
    return avr

@AvrRouter.put("/avr/{roomID}/roomborrowstatus/{status}")
async def update_borrow_status(roomID: int, status: int, db = Depends(get_db)):
    cursor, db_connection = db
    try:
        cursor.execute("UPDATE AVR SET roomborrowstatus = %s WHERE roomID = %s", (status, roomID))
        db_connection.commit()
        return {"message": f"Borrow status updated for room ID {roomID}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db_connection.close()