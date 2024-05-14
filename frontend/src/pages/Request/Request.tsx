import './Request.css';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

interface InputValue {
    name: string;
    code: string;
}

function Request() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [datetime12h, setDateTime12h] = useState<Date | null>(null);
    const [multiselectValue, setMultiselectValue] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);


    const handleloginClick = () => navigate('/');
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');
    
    const itemTemplate = (option: InputValue) => {
        return (
            <div className="sad1">
                
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };
    

    const items = [
        {
            label: <div className='navbar-text'onClick={handleloginClick}>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='navbar-text'onClick={handleAdminClick}>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='navbar-text-uic'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='navbar-text'onClick={handleequipmentsClick}>Feedback</div>,
            icon: 'pi pi-fw pi-calendar',
            
        },
        {
          label: <div className='navbar-text'>Contact </div>,
            icon: 'pi pi-fw pi-power-off'
        }
    ];



    useEffect(() => {
        async function fetchEquipment() {
            try {
                const response = await axios.get('http://localhost:8000/api/equipment/');
                const formattedEquipment = response.data.map((equipmentItem) => ({
                    name: equipmentItem.equipmentName,
                    code: equipmentItem.equipmentID.toString(),
                }));
                setEquipmentOptions(formattedEquipment);
            } catch (error) {
                console.error('Error fetching equipment:', error);
            }
        }
    
        fetchEquipment();
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/avr/');
                const rooms = response.data;
    
                const formattedRoomOptions = rooms.map(room => ({
                    name: room.roomID,
                    code: room.roomID
                }));
    
                const roomOptionsWithNone = [{ name: 'None', code: null }, ...formattedRoomOptions];
                setRoomOptions(roomOptionsWithNone);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
    
        fetchRooms();
    }, []);

    const handleSubmitClick = async () => {
        try {
            // Create equipment set
            console.log("Selected Equipment Codes:", multiselectValue.map(equipmentItem => equipmentItem.code));
            const responseEquipmentSet = await axios.post('http://localhost:8000/api/equipmentset', multiselectValue.map(equipmentItem => equipmentItem.code));
            const equipmentSetIds = responseEquipmentSet.data;

            const requestDate = datetime12h ? datetime12h.toISOString().split('T')[0] : null;
    
            // Create ticket
            const responseTicket = await axios.post('http://localhost:8000/api/tickets/', {
                borrowerID: 1, 
                subject: subject,
                equipmentsetID: equipmentSetIds,
                roomID: dropdownValue && dropdownValue.name !== "None" ? dropdownValue.name : null,
                requestDate: requestDate,
                requestStatus: 0, 
                returnStatus: 0, 
            });
            const ticketData = responseTicket.data;
    
            // Example navigation to the Ticket page with query parameters
            navigate('/Ticket', {
                state: {
                    ticketData,
                }
            });
        } catch (error) {
            console.error('Error creating equipment set or ticket:', error);
        }
    };
    

    return(
        <>
        
        <div className="new-component2">
          <Menubar className='navbar2' model={items} />
        </div>

        <div className='uic-full'> University of the Immaculate Conception </div>
        <div className='Davao-city'>  Davao City</div>
        <div className='equipment-title'> Av Materials and Equipment use form</div>
        
        <hr className='line' />

        
        <div className="app-container2">  </div>

        


        <p className='dearsir' > Dear Sir/Ma'am:</p>
        <p className='dearsirsentence'> I would like to borrow from your office the ff. Materials and Equipments & Accessories:</p>
       
        
        <div className='first-dropdown'>
      <h5>Equipments</h5>
                    <MultiSelect 
                        value={multiselectValue}
                        onChange={(e) => setMultiselectValue(e.value)}
                        options={equipmentOptions}
                        itemTemplate={itemTemplate}
                        optionLabel="name"
                        placeholder= "Select an Equipment"
                        filter
                        className="multiselect-custom"
                        display="chip"
                    />
                </div>

                <div className='room-dropdown'>
                <h5>Room</h5>
                    <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={roomOptions} optionLabel="name" placeholder="Select" />
                    </div>

                <div className="subject-box">
                    <label htmlFor="asd"> <h5>Subject</h5></label>
            <InputTextarea className='inside-subject-box' autoResize value={subject} onChange={(e) => setSubject(e.target.value)} rows={5} cols={30} />
            
        </div>
        
        <div className="dateandTime">
                <label htmlFor="calendar-12h" className="font-bold block mb-2">
                    <h5>Date & Time</h5>
                </label>
                <Calendar id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
            </div>

                
        


            <hr className='newline' />

        <p className='liable-sentence' > I am liable for any damage of the said A materials and equipment</p>
            <input className='checkbox' type="checkbox"></input>
        

                <div className="submit-button">    
            <Button onClick={handleSubmitClick} id='submitcolor-button' label="Submit" />
        </div>
        </>


)
}
export default Request