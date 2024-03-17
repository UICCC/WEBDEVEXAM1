from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
import datetime

# Create an instance of APIRouter
TicketRouter = APIRouter(tags=["Tickets"])

# Define a Ticket model
class Ticket(BaseModel):
    ticket_id: int
    borrower_id: int
    equipmentset_id: int
    room_id: int
    request_date: datetime.date
    request_status: int
    return_date: datetime.date
    return_status: int
    feedback_id: int
    personnel_id: int
    report_id: int

# Define CRUD operations for Tickets
@TicketRouter.get("/tickets/", response_model=list)
async def read_tickets(db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM tickets")
    return [Ticket(**ticket) for ticket in cursor.fetchall()]

@TicketRouter.get("/tickets/{ticket_id}", response_model=Ticket)
async def read_ticket(ticket_id: int, db = Depends(get_db)):
    cursor, _ = db
    cursor.execute("SELECT * FROM tickets WHERE ticket_id = %s", (ticket_id,))
    ticket = cursor.fetchone()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return Ticket(**ticket)

@TicketRouter.post("/tickets/", response_model=Ticket)
async def create_ticket(borrower_id: int = Form(...), equipmentset_id: int = Form(...), room_id: int = Form(...), request_date: datetime.date = Form(...), request_status: int = Form(...), return_date: datetime.date = Form(...), return_status: int = Form(...), feedback_id: int = Form(...), personnel_id: int = Form(...), report_id: int = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("INSERT INTO tickets (borrower_id, equipmentset_id, room_id, request_date, request_status, return_date, return_status, feedback_id, personnel_id, report_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (borrower_id, equipmentset_id, room_id, request_date, request_status, return_date, return_status, feedback_id, personnel_id, report_id))
    db_connection.commit()
    ticket_id = cursor.lastrowid
    return Ticket(ticket_id=ticket_id, borrower_id=borrower_id, equipmentset_id=equipmentset_id, room_id=room_id, request_date=request_date, request_status=request_status, return_date=return_date, return_status=return_status, feedback_id=feedback_id, personnel_id=personnel_id, report_id=report_id)

@TicketRouter.put("/tickets/{ticket_id}", response_model=Ticket)
async def update_ticket(ticket_id: int, borrower_id: int = Form(...), equipmentset_id: int = Form(...), room_id: int = Form(...), request_date: datetime.date = Form(...), request_status: int = Form(...), return_date: datetime.date = Form(...), return_status: int = Form(...), feedback_id: int = Form(...), personnel_id: int = Form(...), report_id: int = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE tickets SET borrower_id = %s, equipmentset_id = %s, room_id = %s, request_date = %s, request_status = %s, return_date = %s, return_status = %s, feedback_id = %s, personnel_id = %s, report_id = %s WHERE ticket_id = %s", (borrower_id, equipmentset_id, room_id, request_date, request_status, return_date, return_status, feedback_id, personnel_id, report_id, ticket_id))
    db_connection.commit()
    return Ticket(ticket_id=ticket_id, borrower_id=borrower_id, equipmentset_id=equipmentset_id, room_id=room_id, request_date=request_date, request_status=request_status, return_date=return_date, return_status=return_status, feedback_id=feedback_id, personnel_id=personnel_id, report_id=report_id)

@TicketRouter.delete("/tickets/{ticket_id}")
async def delete_ticket(ticket_id: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM tickets WHERE ticket_id = %s", (ticket_id,))
    db_connection.commit()
    return {"message": "Ticket deleted successfully"}
