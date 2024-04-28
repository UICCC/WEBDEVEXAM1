import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Borrower.css';

function Borrowers() {
    const [borrowers, setBorrowers] = useState([]);

    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const borrowersresponse = await axios.get('http://localhost:8000/api/borrowers/');
            setBorrowers(borrowersresponse.data);
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    return (
        <>
            <h1 className='feeback-title'>Registered Borrowers</h1>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Borrower ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowers.map(borrower => (
                        <tr key={borrower.borrowerID}>
                            <td>{borrower.borrowerID}</td>
                            <td>{borrower.borrowerName}</td>
                            <td>{borrower.borrowerEmail}</td>
                            <td>{borrower.subject}</td>
                            <td>{borrower.course}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Borrowers;
