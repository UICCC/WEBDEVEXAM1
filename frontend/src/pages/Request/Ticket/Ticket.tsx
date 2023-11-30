import React, { useState, useEffect } from 'react'
import './Ticket.css'
import { InputText } from 'primereact/inputtext';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
        

function Ticket() {
    const [valueequipment, setValueticket] = useState('');
    const [valuepurpose, setValuepurpose] = useState('');
    const [valuedate, setValuedate] = useState('');
    const [formattedCurrentDate, setFormattedCurrentDate] = useState('');
    const [formattedRequestDate, setFormattedRequestDate] = useState('');
    const [formattedReturnDate, setFormattedReturnDate] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const borrowerName = queryParams.get('borrowerName') || '';
    const requestDateString = queryParams.get('requestDate') || '';
    const returnDateString = queryParams.get('returnDate') || '';
    const currentDateString = queryParams.get('currentDate') || '';
    const currentDate = new Date(currentDateString);
    const requestDate = new Date(requestDateString);
    const returnDate = new Date(returnDateString);
    const purpose = queryParams.get('purpose');
    const course = queryParams.get('course');
    const selectedEquipment = queryParams.get('selectedEquipment');
    const selectedRoom = queryParams.get('selectedRoom')
    const year = queryParams.get('year');
    const removeDoubleQuotes = (value) => {
        return value.replace(/['"]+/g, ''); // This will remove all double quotes from the string
    };
    // Formatting the date and time
    useEffect(() => {
        const formatDate = (date) => {
            const year = date.getFullYear().toString().slice(-2);
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            const hours = date.getHours();
            const meridiem = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const minutes = `0${date.getMinutes()}`.slice(-2);
          
            return `${year}/${month}/${day} ${formattedHours}:${minutes} ${meridiem}`;
          };
    
        setFormattedCurrentDate(formatDate(currentDate));
        setFormattedRequestDate(formatDate(requestDate));
        setFormattedReturnDate(formatDate(returnDate));
        setValuedate(formatDate(requestDate));
      }, [currentDate, requestDate, returnDate]);

    const handleequipmentsClick = () => navigate('/Equipments');
    return(
        <>
         <div className="ticket-picture">


        <div className='try-container'> </div>
        <div className='thanks'>

            <h1>Thank you</h1>
        </div>
        <div className='thanks-subtile'>
            <p> We have recieved your ticket and will get back to you soon <b>God bless! </b></p>
        </div>

        <div className='borrowername'>
            <p>BorrowerName: </p>
            </div>
            <div className="borrowernamebox">
            <InputText value={borrowerName} readOnly />
        </div>
        <div className='borrowercourse'>
            <p>Room: </p>
            </div>
            <div className="borrowercoursebox">
            <InputText value={removeDoubleQuotes(selectedRoom || '')} readOnly />
        </div>

        <div className='equipmentborrowed'>
            <p>Equipmentborrowed: </p>
            </div>
            <div className="equipmentticketbox">
            <InputText value={removeDoubleQuotes(selectedEquipment || '')} readOnly />
        </div>
            <div className='purposeticket'>
            <p> Purpose: </p>
            </div>
            <div className="purposeticketbox">
            <InputText value={purpose} readOnly />
        </div>

            <div className='datetimeticket'>
            <p> Date and time: </p>
            </div>
            <div className="dateticketbox">
            <InputText value={formattedRequestDate} readOnly />
        </div>

        <div className='requestdateborrow'>
            <p> Request Date: </p>
            </div>
            <div className="requestdatebox">
            <InputText value={formattedCurrentDate} readOnly />
        </div>
        <div className='returndateborrow'>
            <p> Return Date: </p>
            </div>
            <div className="returndatebox">
            <InputText value={formattedReturnDate} readOnly />
        </div>


        <Button onClick={handleequipmentsClick} className='sendusfeedback' label="Click Here to send us a feedback regarding the equipments" severity="info" rounded />
        


        










            
         </div>
        
        </>
    )
}

export default Ticket
