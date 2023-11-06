import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'; 
import './App.css'
import './button.css'
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
        
        
function App() {

  const navigate = useNavigate();
  const handleloginClick = () => navigate('/');
  const handleSignupClick = () => navigate('/Login');
  
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

const [value, setValue] = useState('');
const [valueName, setName] = useState('');


  

  return (
    <>
     <div className="app-container">

<div className="new-component">
  <Menubar className='navbar' model={items} />
</div>

      <p className='main-title'> Login to your account</p>
    
      
        <div className="Id-box">
            <span className="p-float-label">
                <InputText className="inside-box" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="username">ID Number</label>
            </span>
        </div>
        <div className="name-box">
            <span className="p-float-label">
                <InputText className="inside-name" value={valueName} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="username">Student Name</label>
            </span>
        </div>

    </div>
    <Button onClick={handleloginClick} id='login-button' label="Login" severity="help" rounded />
    <Button onClick={handleSignupClick} id='Signup-button' label="Signup" severity="help" rounded />
    
    

</div>
        
    </>
  )
}

export default App
