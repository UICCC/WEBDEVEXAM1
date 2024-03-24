import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'; 
import axios from 'axios';
import './App.css'
import './button.css'
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import {useNavigate} from 'react-router-dom';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
        
        
        
function App() {

  const navigate = useNavigate();
  const handleloginClick = async () => {
    if (!value || !valuePass) {
      alert("Please fill in both ID Number and Password fields.");
    } else {
      try {
        const response = await axios.get(`http://localhost:8000/api/borrowers/${value}`);
        const borrower = response.data;
  
        // Check if the returned borrower's password matches the input password
        if (borrower && borrower.BorrowerPass === valuePass) {
          // Login successful, navigate to the appropriate page
          alert('Login Successful!');
          navigate('/');
        } else {
          // Login failed, display an error message
          alert('Invalid ID Number or Password.');
        }
      } catch (error) {
        // Handle error, such as network error or server error
        if (error.response && error.response.status === 404) {
          // Borrower with provided ID doesn't exist
          alert('Borrower with provided ID does not exist.');
        } else {
          console.error('An error occurred:', error);
          alert('An error occurred. Please try again later.');
        }
      }
    }
  };
  const handleSignupClick = () => navigate('/Login');
  const handleAdminClick = () => navigate('/Admin');
  const handleequipmentsClick = () => navigate('/Equipments');
  const handleStudentloginClick = () => navigate('/Request');

  
  const items = [
    {
        label: <div className='navbar-text'onClick={handleloginClick}>Home </div>,
        icon: 'pi pi-fw pi-file',
        
    },
    {
      label: <div className='navbar-text' onClick={handleAdminClick}>Overview </div>,
        icon: 'pi pi-fw pi-pencil',
       
    },
    {
      label: <div className='navbar-text-uic'><b>UIC </b> </div>,
        
    },
    {
      label: <div className='navbar-text'onClick={handleequipmentsClick}>Feedback </div>,
        icon: 'pi pi-fw pi-calendar',
        
    },
    {
      label: <div className='navbar-text'>Contact </div>,
        icon: 'pi pi-fw pi-power-off'
    }
];

const [value, setValue] = useState('');
const [valuePass, setPass] = useState('');


  

  return (
    <>
     <div className="app-container"> </div>

<div className="new-component">
  <Menubar className='navbar' model={items} />
</div>
      <div className='outerflex'>
      <p className='main-title'> Login to your account</p>
    
      
        <div className="Id-box-main">
            <span className="p-float-label">
                <InputText className="inside-box" value={value} onChange={(e) => setValue(e.target.value)} />
                <label id="username-main">ID Number</label>
            </span>
        </div>
        <div className="password-box-main">
                <span className="p-float-label">
                    <Password className="inside-password" value={valuePass} onChange={(e) => setPass(e.target.value)} />
                    <label id="password-main">Password</label>
                </span>
            </div>
            </div>

    
    <Button onClick={handleloginClick} id='login-button' label="Login" severity="help" rounded />
    <Button onClick={handleSignupClick} id='Signup-button' label="Signup" severity="help" rounded />
    <Button onClick={handleStudentloginClick} id='studentpage-button' label="Studentlogin" severity="help" rounded />
    


        
    </>
  )
}

export default App
