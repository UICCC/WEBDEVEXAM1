import './equipments.css'
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react';

interface InputValue {
    name: string;
    code: string;
}





function Equipments() {
    const itemTemplate = (option: InputValue) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={`/demo/images/flag/flag_placeholder.png`}
                    onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    className={`flag flag-${option.code.toLowerCase()}`}
                    style={{ width: '21px' }}
                />
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };

    const [multiselectValue, setMultiselectValue] = useState(null);
    const multiselectValues: InputValue[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

  
      
    return(
        <>
       <h5>MultiSelect</h5>
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
       
    
         
        </>
    )
}
export default Equipments
