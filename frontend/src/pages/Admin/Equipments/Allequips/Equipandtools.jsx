import './Equipandtools.css'
import { Menubar } from 'primereact/menubar';
import React, {useState} from "react";
import data from './Equipandtoold.json'

function Equipandtools() {
    const items = [
        {
            label: <div className='tools-navbar-text'>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='tools-navbar-text'>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='tools-navbar-text'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='tools-navbar-text'>Equipments </div>,
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