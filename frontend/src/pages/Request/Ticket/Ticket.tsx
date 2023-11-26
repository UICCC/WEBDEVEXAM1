import React, { useState } from 'react'
import './Ticket.css'
import { InputText } from 'primereact/inputtext';
        

import { Button } from 'primereact/button';
        

function Ticket() {
    const [valueequipment, setValueticket] = useState('');
    const [valuepurpose, setValuepurpose] = useState('');
    const [valuedate, setValuedate] = useState('');

    return(
        <>
         <div className="ticket-picture">


        <div className='try-container'>
        <div className='thanks'>

            <h1>Thank you</h1>
        </div>
        <div className='thanks-subtile'>
            <p> We have recieved you application and will get back to you soon <b>God bless! </b></p>
        </div>

        <div className='equipmentborrowed'>
            <p>Equipmentborrowed: </p>
            </div>
            <div className="equipmentticketbox">
            <InputText value={valueequipment} onChange={(e) => setValueticket(e.target.value)} />
        </div>
            <div className='purposeticket'>
            <p> Purpose: </p>
            </div>
            <div className="purposeticketbox">
            <InputText value={valuepurpose} onChange={(e) => setValuepurpose(e.target.value)} />
        </div>

            <div className='datetimeticket'>
            <p> Date and time: </p>
            </div>
            <div className="dateticketbox">
            <InputText value={valuedate} onChange={(e) => setValuedate(e.target.value)} />
        </div>


        <Button className='sendusfeedback' label="Click Here to send us a feedback regarding the equipments" severity="info" rounded />
        


        </div>










            
         </div>
        
        </>
    )
}

export default Ticket
