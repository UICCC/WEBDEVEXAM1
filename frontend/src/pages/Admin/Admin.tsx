import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import './Admin.css'; // Import the CSS file
import { PanelMenu } from 'primereact/panelmenu';
import data from "./mock-data.json";

function Admin() {

    const [contacts, setContacts] = useState(data);

    const itemsadmin = [
        
        {
            label: <div className='navbartexts'>Home </div>,
            icon: 'pi pi-fw pi-file',
            
        },
        {
          label: <div className='navbartexts'>Overview </div>,
            icon: 'pi pi-fw pi-pencil',
           
        },
        {
          label: <div className='navbartextsuic'><b>UIC </b> </div>,
            
        },
        {
          label: <div className='navbartexts'>Equipments </div>,
            icon: 'pi pi-fw pi-calendar',
            
        },
        {
          label: <div className='navbartexts'>Contact </div>,
            icon: 'pi pi-fw pi-power-off'
        }
    ];


    const panelMenuitems = [
        {
            label: <div className='panelmenu-bar'>Students </div>,
            icon:  'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Student',
                            icon: 'pi pi-fw pi-plus'
                        },
                        
                    ]
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: <div className='panelmenu-bar'>Equipments </div>,
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                }
            ]
        },
        {
            label: <div className='panelmenu-bar'>Reports </div>,
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass'
                },
               
            ]
        },
        {
            label: <div className='panelmenu-bar'>Profile </div>,
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                
            ]
        }
    ];

    

    

    
    

    return (
        <>

        

        <div className="vl"></div>

        
        
        
        
        <div className="wh">
            <Menubar model={itemsadmin} start={<h1 className="admin-header">Admin</h1>}
                end={<InputText placeholder="Search" type="text" className="search-input" />} />
        </div>


        <div className='ytable'>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>address</th>
                    <th>phone</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                    {contacts.map((contact)=> (
                     <tr>
                        <td>{contact.fullName}</td>
                        <td>{contact.address}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>{contact.email}</td>
                    </tr>
                    ))}
                    
                </tbody>
                </table>

                <h2>Add a contact</h2>
                <form>
                    <input type='text' 
                    name='fullName' 
                    required='required' 
                    placeholder='Enter a name'
                    />
                    <input type='text' 
                    name='address' 
                    required='required' 
                    placeholder='Enter a address'
                    />
                    <input type='text' 
                    name='PhoneNumber' 
                    required='required' 
                    placeholder='Enter a phone number'
                    />
                    <input type='email;' 
                    name='email' 
                    required='required' 
                    placeholder='Enter a email'
                    />
                    <button type='submit'> add</button>

                </form>
                </div> 

        
        <div className="sidebar-menu">
                <div className="trythis">
                    <PanelMenu className='sidebar-menu-options' model={panelMenuitems} />
                </div>
            </div>

          
            
            
            </>

    );
}

export default Admin;
