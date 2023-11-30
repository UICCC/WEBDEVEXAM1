import './Request.css';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import {useNavigate} from 'react-router-dom';

interface InputValue {
    name: string;
    code: string;
}

function Request() {
    const navigate = useNavigate();
    const handleSubmitClick = () => navigate('/Ticket');
    const handleloginClick = () => navigate('/');
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');
    

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

    

    


    const [multiselectValue, setMultiselectValue] = useState(null);
    const multiselectValues = [
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
    const itemTemplate = (option: InputValue) => {
        return (
            <div className="sad1">
                
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };
  
    const [purpose, setPurpose] = useState('');
    const [datetime12h, setDateTime12h] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);

    const dropdownValues: InputValue[] = [
        { name: 'Room1', code: 'NY' },
        { name: 'Room2', code: 'RM' }
        
    ];

    

   



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
                        options={multiselectValues}
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
                    <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                    </div>

                <div className="purpose-box">
                    <label htmlFor="asd"> <h5>Purpose</h5></label>
            <InputTextarea className='inside-purpose-box' autoResize value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={5} cols={30} />
            
        </div>
        
        <div className="dateandTime">
                <label htmlFor="calendar-12h" className="font-bold block mb-2">
                    <h5>Date & Time</h5>
                </label>
                <Calendar id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
            </div>

                
        


            <hr className='newline' />

        <p className='liable-sentence' > I am liable for any damage of the said A materials and equipment</p>

        <div className="course-year">
                    <h5>Year Level</h5>
                    <div className="formgroup-inline">
                        <div className="field">
                            <label id="firstname1" className="p-sr-only">
                                Firstname
                            </label>
                            <InputText id="firstname1" type="text" placeholder="Course" />
                        </div>
                        <div className="field">
                            <label id="lastname1" className="p-sr-only">
                                Lastname
                            </label>
                            <InputText id="lastname1" type="text" placeholder="Year" />
                        </div>
                    </div>
                </div>

                <div className="submit-button">
            <Button onClick={handleSubmitClick} id='submitcolor-button' label="Submit" />
        </div>
        </>


)
}
export default Request