from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
import datetime
from typing import Optional
import bcrypt

MonthlyReportRouter = APIRouter(tags=["Monthly Report"])

class MonthlyReportCreate(BaseModel):
    reportID: int
    ticketID: Optional[int] = None
    reportDate: datetime.date
    month: int
    year: int

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

@MonthlyReportRouter.get("/monthlyreport/", response_model=list)
async def read_monthly_reports(db = Depends(get_db)):
    query = "SELECT * FROM monthlyreport"
    db[0].execute(query)
    monthlyreport = db[0].fetchall()
    return monthlyreport

@MonthlyReportRouter.get("/monthlyreport/{reportID}", response_model=dict)
async def read_single_report(reportID: int, db=Depends(get_db)):

        query = "SELECT reportID, ticketID, reportDate, month, year FROM monthlyreport WHERE reportID = %s"
        db[0].execute(query, (reportID,))
        monthlyreport = db[0].fetchone()
        
        if monthlyreport:
            return {
                "reportID": monthlyreport['reportID'],
                "ticketID": monthlyreport['ticketID'],
                "reportDate": monthlyreport['reportDate'],
                "month": monthlyreport['month'],
                "year": monthlyreport['year'],
            }
        else:
            raise HTTPException(status_code=404, detail="User not found")

@MonthlyReportRouter.post("/monthlyreport/")
async def create_report(monthlyreport: MonthlyReportCreate, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute(
        "INSERT INTO monthlyreport (reportID, ticketID, reportDate, month, year) VALUES ( %s, %s, %s, %s, %s)",
        (monthlyreport.reportID, monthlyreport.ticketID, monthlyreport.reportDate, monthlyreport.month, monthlyreport.year)
    )
    db_connection.commit()
    db_connection.close()
    return monthlyreport.dict()

@MonthlyReportRouter.put("/monthlyreport/{reportID}")
async def update_report(reportID: int, ticketID: int = Form(None), reportDate: datetime.date = Form(...), month: int = Form(...), year: int = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE monthlyreport SET ticketID = %s, reportDate = %s, month = %s, year = %s WHERE reportID = %s", (ticketID, reportDate, month, year, reportID))
    db_connection.commit()
    db_connection.close()
    return {"reportID": reportID, "ticketID": ticketID, "reportDate": reportDate, "month": month, "year": year}

@MonthlyReportRouter.delete("/monthlyreport/{reportID}")
async def delete_report(reportID: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM monthlyreport WHERE reportID = %s", (reportID,))
    db_connection.commit()
    db_connection.close()
    return {"message": "Report deleted successfully"}
