import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Personnel.css';

import { Menubar } from 'primereact/menubar';
        


function Personnel() {



    const [personnel, setPersonnel] = useState([]);
    const [newPersonnel, setNewPersonnel] = useState({
        personnelID: '',
        personnelName: '',
        PersonnelPass: ''
    });

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];


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
            <div className='control the box'></div>
            <div className="card">
            <Menubar model={items} />
         </div>
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
