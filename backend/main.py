from fastapi import FastAPI
from model.ticket import TicketRouter
from model.borrower import BorrowersRouter
from model.personnel import PersonnelRouter
from model.equipment import EquipmentRouter
from model.equipmentfeedback import EquipmentFeedbackRouter
from model.equipmentset import EquipmentSetRouter
from model.monthlyreport import MonthlyReportRouter

app = FastAPI()

# Include routers
app.include_router(TicketRouter, prefix="/api")
app.include_router(BorrowersRouter, prefix="/api")
app.include_router(PersonnelRouter, prefix="/api")
app.include_router(EquipmentRouter, prefix="/api")
app.include_router(EquipmentFeedbackRouter, prefix="/api")
app.include_router(EquipmentSetRouter, prefix="/api")
app.include_router(MonthlyReportRouter, prefix="/api")
