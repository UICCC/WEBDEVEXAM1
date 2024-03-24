import './Login.css';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';






function Login() {

    const navigate = useNavigate();
    const handleloginClick = () => {
      if (!value || !valuePass1) {
        alert("Please fill in both ID Number and Password fields.");
      } else {
        navigate('/');
      }
    };
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');

    const items = [
        {
            label: <div className='navbar-text'onClick={handleloginClick} >Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='navbar-text'onClick={handleAdminClick} >Overview </div>,
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
    const [valueName, setName] = useState('');
    const [valueEmail, setEmail] = useState('');
    const [valuePass1, setPass1] = useState('');
    

  
      
    return(
        <>
        <div className="app-container1"> </div>
    
        <div className="new-component">
          <Menubar className='navbar' model={items} />
        </div>
    
          <p className='main-title'> Login to your account</p>
        
          
            <div className="Id-box">
                <span className="p-float-label">
                    <InputText className="inside-box" value={value} onChange={(e) => setValue(e.target.value)} />
                    <label id ="username">ID Number</label>
                </span>
            </div>
            <div className="name-box">
                <span className="p-float-label">
                    <InputText className="inside-name" value={valueName} onChange={(e) => setName(e.target.value)} />
                    <label id="username">Student Name</label>
                </span>
            </div>
    
            <div className="email-box">
                <span className="p-float-label">
                    <InputText className="inside-email" value={valueEmail} onChange={(e) => setEmail(e.target.value)} />
                    <label id="username">Email Address</label>
                </span>
            </div>
    
            <div className="password-box">
                <span className="p-float-label">
                    <Password className="inside-password" value={valuePass1} onChange={(e) => setPass1(e.target.value)} />
                    <label id="password1">Password</label>
                </span>
            </div>
            <Button onClick={handleloginClick} id='login-button' label="Login" severity="help" rounded />
            <Button id='Signup-button' label="Signup" severity="help" rounded />
            
            
    
        
       
    
         
        </>
    )
}
export default Login
