import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Borrower.css';

function Borrowers() {
    const [borrowers, setBorrowers] = useState([]);
    const [deletedBorrower, setDeletedBorrower] = useState(null);

    useEffect(() => {
        fetchBorrowers();
    }, [deletedBorrower]);

    const fetchBorrowers = async () => {
        try {
            const borrowersresponse = await axios.get('http://localhost:8000/api/borrowers/');
            setBorrowers(borrowersresponse.data);
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    const handleDelete = async (borrowerID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this borrower?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/borrowers/${borrowerID}`);
                setDeletedBorrower(borrowerID);
            } catch (error) {
                console.error('Error deleting borrower:', error);
            }
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
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowers.map(borrower => (
                        <tr key={borrower.borrowerID}>
                            <td>{borrower.borrowerID}</td>
                            <td>{borrower.borrowerName}</td>
                            <td>{borrower.borrowerEmail}</td>
                            <td>{borrower.course}</td>
                            <td>
                                <button onClick={() => handleDelete(borrower.borrowerID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Borrowers;
