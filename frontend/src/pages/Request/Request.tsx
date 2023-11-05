import './Request.css';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

interface InputValue {
    name: string;
    code: string;
}

function Request() {

    const items = [
        {
            label: <div className='navbar-text'>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='navbar-text'>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='navbar-text-uic'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='navbar-text'>Equipments </div>,
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
        { name: 'Mic. Stand', code: 'US' }
    ];
    const itemTemplate = (option: InputValue) => {
        return (
            <div className="sad1">
                
                <span className="ml-2">{option.name}</span>
            </div>
        );
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
       
        

        




        <p className='liable-sentence' > I am liable for any damage of the said A materials and equipment</p>
        <p className='courseandyear'> Course & Year:</p>
        <p className='totalstudent'> No. of Students</p>



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

      
        </>


)
}
export default Request