import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pending.css';

function Pending() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tickets/');
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleAccept = async (ticketID) => {
        try {
            await axios.put(`http://localhost:8000/api/tickets/${ticketID}/status/1`);
            // Update the local state after successful acceptance
            setTickets(tickets.map(ticket => 
                ticket.ticketID === ticketID ? { ...ticket, requestStatus: 1 } : ticket
            ));
            console.log(`Accepted ticket with ID ${ticketID}`);
        } catch (error) {
            console.error('Error accepting ticket:', error);
        }
    };
    
    const handleDecline = async (ticketID) => {
        try {
            await axios.delete(`http://localhost:8000/api/tickets/${ticketID}`);
            // Remove the ticket from the local state after successful decline
            setTickets(tickets.filter(ticket => ticket.ticketID !== ticketID));
            console.log(`Declined ticket with ID ${ticketID}`);
        } catch (error) {
            console.error('Error declining ticket:', error);
        }
    };

    return (
        <>
            <h1 className='pending-title'>Pending Requests</h1>
            <table className="custom-table-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Course</th>
                        <th>Equipment</th>
                        <th>Time</th>
                        <th>Room</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets
                        .filter(ticket => !ticket.requestStatus) // Filter tickets with requestStatus = 0
                        .map(ticket => (
                            <tr key={ticket.ticketID}>
                                <td>{ticket.borrowerName}</td>
                                <td>{ticket.subject}</td>
                                <td>{ticket.course}</td>
                                <td>{ticket.equipmentNames}</td>
                                <td>{ticket.requestDate}</td>
                                <td>{ticket.roomID}</td>
                                <td>
                                    <button onClick={() => handleAccept(ticket.ticketID)}>Accept</button>
                                    <button onClick={() => handleDecline(ticket.ticketID)}>Decline</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default Pending;
