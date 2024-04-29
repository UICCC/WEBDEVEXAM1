import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';

function Report() {
    const [monthlyReports, setMonthlyReports] = useState([]);

    useEffect(() => {
        fetchMonthlyReports();
    }, []);

    const fetchMonthlyReports = async () => {
        try {
            const response = await axios.get();
            setMonthlyReports(response.data);
        } catch (error) {
            console.error('Error fetching monthly reports:', error);
        }
    };

    return (
        <div>
            {monthlyReports.map(monthlyReport => (
                <div key={monthlyReport.reportID}>
                    <h2>{monthlyReport.month} {monthlyReport.year}</h2>
                    <p>Date Generated: {monthlyReport.reportDate}</p>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Borrower ID</th>
                                <th>Borrower Name</th>
                                <th>Subject</th>
                                <th>Course</th>
                                <th>Equipment</th>
                                <th>Room ID</th>
                                <th>Request Date</th>
                                <th>Return Date</th>
                                <th>Approved by</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyReport.tickets.map(ticket => (
                                <tr key={ticket.ticketID}>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.borrowerID}</td>
                                    <td>{ticket.borrowerName}</td>
                                    <td>{ticket.subject}</td>
                                    <td>{ticket.course}</td>
                                    <td>{ticket.equipmentNames}</td>
                                    <td>{ticket.roomID}</td>
                                    <td>{ticket.requestDate}</td>
                                    <td>{ticket.returnDate}</td>
                                    <td>{ticket.approvedBy}</td>
                                    <td>{ticket.feedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Report;
