import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Personnel.css';

function Personnel() {
    const [personnel, setPersonnel] = useState([]);
    const [newPersonnel, setNewPersonnel] = useState({
        personnelID: '',
        personnelName: '',
        PersonnelPass: ''
    });

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/personnel/');
            setPersonnel(response.data);
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPersonnel({ ...newPersonnel, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/personnel/', newPersonnel);
            // Reset the form and fetch updated personnel data
            setNewPersonnel({
                personnelID: '',
                personnelName: '',
                PersonnelPass: ''
            });
            fetchPersonnel();
        } catch (error) {
            console.error('Error creating personnel:', error);
        }
    };

    const renderPersonnelTableRows = () => {
        return personnel.map(person => (
            <tr key={person.personnelID}>
                <td>{person.personnelID}</td>
                <td>{person.personnelName}</td>
            </tr>
        ));
    };

    return (
        <>
            <h1>PERSONNEL</h1>
            <table>
                <thead>
                    <tr>
                        <th>Personnel ID</th>
                        <th>Personnel Name</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPersonnelTableRows()}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label htmlFor="personnelID">Personnel ID:</label>
                <input type="text" id="personnelID" name="personnelID" value={newPersonnel.personnelID} onChange={handleInputChange} required />
                <label htmlFor="personnelName">Personnel Name:</label>
                <input type="text" id="personnelName" name="personnelName" value={newPersonnel.personnelName} onChange={handleInputChange} required />
                <label htmlFor="PersonnelPass">Personnel Password:</label>
                <input type="password" id="PersonnelPass" name="PersonnelPass" value={newPersonnel.PersonnelPass} onChange={handleInputChange} required />
                <button type="submit">Add Personnel</button>
            </form>
        </>
    );
}

export default Personnel;
