from fastapi import Depends, HTTPException, APIRouter, Form
from .db import get_db
from pydantic import BaseModel
import datetime
from typing import Optional
import bcrypt

# Create an instance of APIRouter
TicketRouter = APIRouter(tags=["Tickets"])

# Define a Ticket model
class TicketCreate(BaseModel):
    ticketID: int
    borrowerID: int
    equipmentsetID: int
    roomID: int
    requestDate: datetime.date
    requestStatus: int
    returnDate: datetime.date
    returnStatus: int
    feedbackID: Optional[int] = None
    personnelID: Optional[int] = None
    reportID: int

def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Define CRUD operations for Tickets
@TicketRouter.get("/tickets/", response_model=list)
async def read_tickets(db = Depends(get_db)):
    query = """
       SELECT 
    t.ticketID, 
    t.borrowerID, 
    b.borrowerName, 
    b.subject,
    b.course,
    t.equipmentsetID, 
    GROUP_CONCAT(e.equipmentName SEPARATOR ', ') AS equipmentNames, 
    t.roomID, 
    r.roomBorrowStatus, 
    t.requestDate, 
    t.requestStatus, 
    t.returnDate, 
    t.returnStatus, 
    t.feedbackID,
    p.personnelID, 
    p.personnelName, 
    m.month AS reportMonth,
    m.year AS reportYear
FROM 
    ticket t
LEFT JOIN 
    borrower b ON t.borrowerID = b.borrowerID
LEFT JOIN 
    avr r ON t.roomID = r.roomID
LEFT JOIN 
    equipmentsetid es ON t.equipmentsetID = es.equipmentsetID
LEFT JOIN 
    equipment e ON es.equipmentID = e.equipmentID
LEFT JOIN 
    personnel p ON t.personnelID = p.personnelID
LEFT JOIN 
    monthlyreport m ON t.reportID = m.reportID
GROUP BY 
    t.ticketID;


    """
    db[0].execute(query)
    tickets = db[0].fetchall()
    return tickets



@TicketRouter.get("/tickets/{ticketID}", response_model=dict)
async def read_ticket(ticketID: int, db = Depends(get_db)):
    query = "SELECT ticketID, borrowerID, equipmentsetID, roomID, requestDate, requestStatus, returnDate, returnStatus, feedbackID, personnelID, reportID FROM ticket WHERE ticketID = %s"
    db[0].execute(query, (ticketID,))
    ticket = db[0].fetchone()
        
    if ticket:
            return {
                "ticketID": ticket['ticketID'],
                "borrowerID": ticket['borrowerID'],
                "equipmentsetID": ticket['equipmentsetID'],
                "roomID": ticket['roomID'],
                "requestDate": ticket['requestDate'],
                "requestStatus": ticket['requestStatus'],
                "returnDate": ticket['returnDate'],
                "returnStatus": ticket['returnStatus'],
                "feedbackID": ticket['feedbackID'],
                "personnelID": ticket['personnelID'],
                "reportID": ticket['reportID'],
            }
    else:
            raise HTTPException(status_code=404, detail="User not found")

@TicketRouter.post("/tickets/")
async def create_ticket(ticket: TicketCreate, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute(
        "INSERT INTO ticket (ticketID, borrowerID, equipmentsetID, roomID, requestDate, requestStatus, returnDate, returnStatus, feedbackID, personnelID, reportID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (ticket.ticketID, ticket.borrowerID, ticket.equipmentsetID, ticket.roomID, ticket.requestDate, ticket.requestStatus, ticket.returnDate, ticket.returnStatus, ticket.feedbackID, ticket.personnelID, ticket.reportID))
    db_connection.commit()
    db_connection.close()
    return ticket.dict()

@TicketRouter.put("/tickets/{ticketID}")
async def update_ticket(ticketID: int, borrowerID: str = Form(...), equipmentsetID: int = Form(...), roomID: int = Form(...), requestDate: datetime.date = Form(...), requestStatus: bool = Form(...), returnDate: datetime.date = Form(...), returnStatus: bool = Form(...), feedbackID: int = Form(...), personnelID: int = Form(...), reportID: int = Form(...), db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("UPDATE ticket SET borrowerID = %s, equipmentsetID = %s, roomID = %s, requestDate = %s, requestStatus = %s, returnDate = %s, returnStatus = %s, feedbackID = %s, personnelID = %s, reportID = %s WHERE ticketID = %s", (borrowerID, equipmentsetID, roomID, requestDate, requestStatus, returnDate, returnStatus, feedbackID, personnelID, reportID, ticketID))
    db_connection.commit()
    db_connection.close()
    return {"ticketID": ticketID, "borrowerID": borrowerID, "equipmentsetID": equipmentsetID, "roomID": roomID, "requestDate": requestDate, "requestStatus": requestStatus, "returnDate": returnDate, "returnStatus": returnStatus, "feedbackID": feedbackID, "personnelID": personnelID, "reportID": reportID}

@TicketRouter.delete("/tickets/{ticketID}")
async def delete_ticket(ticketID: int, db = Depends(get_db)):
    cursor, db_connection = db
    cursor.execute("DELETE FROM ticket WHERE ticketID = %s", (ticketID,))
    db_connection.commit()
    db_connection.close()
    return {"message": "Ticket deleted successfully"}

@TicketRouter.put("/tickets/{ticketID}/status/{status}")
async def update_pending_request_status(ticketID: int, status: int, db = Depends(get_db)):
    cursor, db_connection = db
    try:
        cursor.execute("UPDATE ticket SET requestStatus = %s WHERE ticketID = %s", (status, ticketID))
        db_connection.commit()
        return {"message": f"Request status updated for ticket ID {ticketID}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db_connection.close()