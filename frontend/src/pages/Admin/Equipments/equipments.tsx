import './equipments.css'
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import {useNavigate} from 'react-router-dom';
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";

import { Button } from 'primereact/button';
        

interface InputValue {
    name: string;
    code: string;
}





function Equipments() {
    const navigate = useNavigate();
    const handleloginClick = () => navigate('/');
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');

    const items = [
        {
            label: <div className='ticketnavbar'onClick={handleloginClick}>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='ticketnavbar' onClick={handleAdminClick}>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='navbar-text-uic'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='ticketnavbar'onClick={handleequipmentsClick}>Equipments </div>,
            icon: 'pi pi-fw pi-calendar',
            
        },
        {
          label: <div className='ticketnavbar'>Contact </div>,
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const itemTemplate = (option: InputValue) => {
        return (
            <div className="feedbackbox">
                
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };

    const [multiselectValue, setMultiselectValue] = useState(null);
    const multiselectValues: InputValue[] = [
        { name: 'Audio Cord', code: 'AU' },
        { name: 'Ext. Wire', code: 'BR' },
        { name: 'HDMI Connector', code: 'CN' },
        { name: 'Ipad Connector', code: 'EG' },
        { name: 'HDMI Cord', code: 'FR' },
        { name: 'karaoke', code: 'DE' },
        { name: 'LCD', code: 'IN' },
        { name: 'Microphone', code: 'JP' },
        { name: 'Mic. Cord', code: 'ES' },
        { name: 'Mic. Stand', code: 'US' },
        { name: 'Pc', code: 'ES' },
        { name: 'Type-C HDMI Connector', code: 'ES' },
        { name: 'Portable CD/DVD player', code: 'ES' },
        { name: 'Portable wirless amplifier ', code: 'ES' },
        { name: 'PPT Presenter', code: 'ES' },
        { name: 'AD', code: 'ES' },
        { name: 'CD/ICD', code: 'ES' },
        { name: 'Bluetooth Speaker', code: 'ES' },
        { name: 'HC', code: 'ES' },
        { name: 'KT', code: 'ES' },
        { name: 'LC', code: 'ES' },
        { name: 'PI', code: 'ES' },
        { name: 'QG', code: 'ES' },
        { name: 'Mac Con', code: 'ES' },
        { name: 'VD', code: 'ES' },
    ];

    const [valueStar, setStar] = useState(null);
    const [valuefeedback, setfeedback] = useState('');

    return(
        <>
        
        <div className="ticket-component">
            
  <Menubar className='ticketnavbar2' model={items} />
  <p className='feedbkac-sentence'>We would like to hear your feedback regarding the equipments borrowed what is you opinion regarding the equipments or tools </p>
  <p className='feebacksentence2'> Please select an equipments or tools you have borrowed and give the rating <b>Thank you</b></p>
  <div className='forpicture'></div>

    </div>
   
        <div className='adjustfeedback'>
       <h5>Equipments and Tools</h5>
                    <MultiSelect
                        value={multiselectValue}
                        onChange={(e) => setMultiselectValue(e.value)}
                        options={multiselectValues}
                        itemTemplate={itemTemplate}
                        optionLabel="name"
                        placeholder="Select Countries"
                        filter
                        className="multiselect-custom"
                        display="chip"
                    />

            <div className="ratingstar">
            <Rating value={valueStar} onChange={(e) => setStar(e.value)} />
            </div>
            <div className="feeback-purpose-box">
            <InputTextarea autoResize value={valuefeedback} onChange={(e) => setfeedback(e.target.value)} rows={5} cols={30} placeholder="Enter your additional feedback here..." />
        </div>
        <div className="feedback-submit-button">
            <Button label="Submit" />
        </div>



            </div>
    
         
        </>
    )
}
export default Equipments
