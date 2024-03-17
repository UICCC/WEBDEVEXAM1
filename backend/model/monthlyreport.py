from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
import datetime

MonthlyReportRouter = APIRouter(tags=["Monthly Report"])

class MonthlyReport(BaseModel):
    report_id: int
    ticket_id: int
    report_date: datetime.date
    month: int
    year: int

@MonthlyReportRouter.get("/monthlyreport/", response_model=list)
async def read_monthly_reports(db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM monthly_report")
    return [MonthlyReport(**report) for report in cursor.fetchall()]

@MonthlyReportRouter.get("/monthlyreport/{report_id}", response_model=MonthlyReport)
async def read_single_monthly_report(report_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM monthly_report WHERE report_id = %s", (report_id,))
    report = cursor.fetchone()
    if not report:
        raise HTTPException(status_code=404, detail="Monthly Report not found")
    return MonthlyReport(**report)

@MonthlyReportRouter.post("/monthlyreport/", response_model=MonthlyReport)
async def create_monthly_report(ticket_id: int, report_date: str, month: int, year: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO monthly_report (ticket_id, report_date, month, year) VALUES (%s, %s, %s, %s)", (ticket_id, report_date, month, year))
    db_connection.commit()
    report_id = cursor.lastrowid
    return MonthlyReport(report_id=report_id, ticket_id=ticket_id, report_date=report_date, month=month, year=year)

@MonthlyReportRouter.put("/monthlyreport/{report_id}", response_model=MonthlyReport)
async def update_monthly_report(report_id: int, ticket_id: int, report_date: str, month: int, year: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE monthly_report SET ticket_id = %s, report_date = %s, month = %s, year = %s WHERE report_id = %s", (ticket_id, report_date, month, year, report_id))
    db_connection.commit()
    return MonthlyReport(report_id=report_id, ticket_id=ticket_id, report_date=report_date, month=month, year=year)

@MonthlyReportRouter.delete("/monthlyreport/{report_id}")
async def delete_monthly_report(report_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM monthly_report WHERE report_id = %s", (report_id,))
    db_connection.commit()
    return {"message": "Monthly Report deleted successfully"}
