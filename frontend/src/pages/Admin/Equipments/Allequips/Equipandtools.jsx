import './Equipandtools.css'
import { Menubar } from 'primereact/menubar';
import React, {useState} from "react";
import data from './Equipandtoold.json'
import {useNavigate} from 'react-router-dom';

function Equipandtools() {

    const navigate = useNavigate();
    const handleloginClick = () => navigate('/');
    const handleSignupClick = () => navigate('/Login');
    const handleAdminClick = () => navigate('/Admin');
    const handleequipmentsClick = () => navigate('/Equipments');
  
    const items = [
        {
            label: <div className='tools-navbar-text'onClick={handleloginClick}>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='tools-navbar-text'onClick={handleAdminClick}>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='tools-navbar-text'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='tools-navbar-text'onClick={handleequipmentsClick}>Equipments </div>,
            icon: 'pi pi-fw pi-calendar',
            
        },
        {
          label: <div className='tools-navbar-text'>Contact </div>,
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const [searchTerm, setSearchTerm] = useState("");
   

    return(
        <>

        <div className='asdasd'></div>
        <div>
        <Menubar className='tools-navbar-text-2' model={items} />
        </div>

        <h1 className='toolstitile'> Equipments and Tools</h1>

        <div className="templateContainer">
        <div className="searchInput_Container">
          <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
        </div>
        <div className="template_Container">
          {
            data 
              .filter((val) => {
                if(searchTerm == ""){
                  return val;
                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
              })
              .map((val) => {
                return(
                  <div className="template" key={val.id}>
                      <img src={val.image} alt="" />
                      <h3>{val.title}</h3>
                      <h4>ID: {val.id}</h4>
                      <h4>Borrow Status: Available</h4>
                      <h5><em>Description</em></h5>
                  </div> 
                )
              })
          }
        </div>
      </div>
        </>
    )
}
export default Equipandtools