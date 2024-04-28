import './Equipandtools.css';
import { Menubar } from 'primereact/menubar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Equipandtools() {
    const navigate = useNavigate();
    const handleloginClick = () => navigate('/');
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');

    const [equipmentData, setEquipmentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEquipmentData();
    }, []);

    const fetchEquipmentData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/equipment/');
            const data = await response.json();
            setEquipmentData(data);
        } catch (error) {
            console.error('Error fetching equipment data:', error);
        }
    };

    const items = [
        { label: <div className='tools-navbar-text' onClick={handleloginClick}>Home </div>, icon: 'pi pi-fw pi-file' },
        { label: <div className='tools-navbar-text' onClick={handleAdminClick}>Overview </div>, icon: 'pi pi-fw pi-pencil' },
        { label: <div className='tools-navbar-text'><b>UIC </b> </div> },
        { label: <div className='tools-navbar-text' onClick={handleequipmentsClick}>Equipments </div>, icon: 'pi pi-fw pi-calendar' },
        { label: <div className='tools-navbar-text'>Contact </div>, icon: 'pi pi-fw pi-power-off' }
    ];

    return (
        <>
            <div className='asdasd'></div>
            <div>
                <Menubar className='tools-navbar-text-2' model={items} />
            </div>
            <h1 className='toolstitile'> Equipments and Tools</h1>
            <div className="templateContainer">
                <div className="searchInput_Container">
                    <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => setSearchTerm(event.target.value)} />
                </div>
                <div className="template_Container">
                    {
                        equipmentData
                            .filter((val) => {
                                if (searchTerm === '') {
                                    return val;
                                } else if (val.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            })
                            .map((val) => (
                                <div className="template" key={val.equipmentID}>
                                    <h3>{val.equipmentName}</h3>
                                    <h4>ID: {val.equipmentID}</h4>
                                    <h4>Borrow Status: {val.equipmentBorrowStatus ? 'Available' : 'Unavailable'}</h4>
                                    <h5><em>Description: {val.equipmentDesc}</em></h5>
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    );
}

export default Equipandtools;
