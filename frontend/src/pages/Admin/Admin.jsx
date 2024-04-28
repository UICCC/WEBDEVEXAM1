import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import './Admin.css'; // Import the CSS file
import { PanelMenu } from 'primereact/panelmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const ticketresponse = await axios.get('http://localhost:8000/api/tickets/');
      setTickets(ticketresponse.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const navigate = useNavigate();
  const handleReportsClick = () => navigate('/')
  const handleLoginClick = () => navigate('/');
  const handleEquipandtoolsClick = () => navigate('/Equipandtools');
  const handlePendingClick = () => navigate('/Pending');

  const itemsadmin = [
    {
      label: <div className='navbartexts' onClick={handleLoginClick}>Home</div>,
      icon: 'pi pi-fw pi-file',
    },
    {
      label: <div className='navbartexts'>Overview</div>,
      icon: 'pi pi-fw pi-pencil',
    },
    {
      label: <div className='navbartextsuic'><b>UIC</b></div>,
    },
    {
      label: <div className='navbartexts' onClick={handleEquipandtoolsClick}>Equipments</div>,
      icon: 'pi pi-fw pi-calendar',
    },
    {
      label: <div className='navbartexts' onClick={handlePendingClick}>Pendings</div>,
      icon: 'pi pi-fw pi-user-plus'
    }
  ];

  const panelMenuitems = [
    {
      label: <div className='panelmenu-bar'>Students</div>,
      icon: 'pi pi-fw pi-user',
    },
    {
      label: <div className='panelmenu-bar' onClick={handleEquipandtoolsClick}>Equipments</div>,
      icon: 'pi pi-fw pi-shopping-cart',
    },
    {
      label: <div className='panelmenu-bar' onClick={handleReportsClick}>Reports</div>,
      icon: 'pi pi-fw pi-envelope',
    },
  ];

  return (
    <>
      <div className="vl"></div>
      <div className="wh">
        <Menubar
          model={itemsadmin}
          start={<h1 className="admin-header">Admin</h1>}
          end={<InputText placeholder="Search" type="text" className="search-input" />}
        />
      </div>
      <div className="sidebar-menu">
        <div className="trythis">
          <PanelMenu className='sidebar-menu-options' model={panelMenuitems} />
        </div>
      </div>
      <div className="master-detail-container">
        <div className="master-section">
          <DataTable
            value={tickets}
            selectionMode="single"
            selection={selectedTicket}
            onSelectionChange={(e) => setSelectedTicket(e.value)}
          >
            <Column field="ticketID" header="Ticket ID"></Column>
            <Column field="borrowerID" header="Borrower ID"></Column>
            <Column field="equipmentsetID" header="Equipment Set ID"></Column>
            <Column field="roomID" header="Room ID"></Column>
            <Column field="requestDate" header="Request Date"></Column>
            <Column field="requestStatus" header="Request Status"></Column>
            <Column field="returnDate" header="Return Date"></Column>
            <Column field="returnStatus" header="Return Status"></Column>
            <Column field="feedbackID" header="Feedback ID"></Column>
            <Column field="personnelID" header="Personnel ID"></Column>
            <Column field="reportID" header="Report ID"></Column>
          </DataTable>
        </div>
        <div className="detail-section">
          {/* Edit and delete section */}
        </div>
      </div>
    </>
  );
}

export default Admin;
