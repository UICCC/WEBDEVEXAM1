import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tickets/');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const navigate = useNavigate();

  const handleReportsClick = () => navigate('/Reports');
  const handleLoginClick = () => navigate('/');
  const handleEquipandtoolsClick = () => navigate('/Equipandtools');
  const handlePendingClick = () => navigate('/Pending');
  const handleBorrowersClick = () => navigate('/Borrower');
  const handlePersonnelClick = () => navigate('/');

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
    ,
    {
      label: <div className='navbartexts' onClick={handlePendingClick}>Pendings</div>,
      icon: 'pi pi-fw pi-user-plus'
    }
  ];

  const panelMenuitems = [
    {
      label: <div className='panelmenu-bar' onClick={handleBorrowersClick}>Borrowers</div>,
      icon: 'pi pi-fw pi-user',
    },
    {
      label: <div className='panelmenu-bar' onClick={handlePersonnelClick}>Personnel</div>,
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

  const getRequestStatus = (status) => {
    return status === 1 ? 'Approved' : 'Not Approved';
  };

  const getReturnStatus = (status) => {
    return status === 1 ? 'Returned' : 'Not Returned';
  };

  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  };

  // Filter tickets with requestStatus = 1 (approved)
  const filteredTickets = tickets.filter(ticket => ticket.requestStatus === 1);

  return (
    <>
      <div className="vl"></div>
      <div className="wh">
        <Menubar
          model={itemsadmin}
          start={<h1 className="admin-header">Admin</h1>}
          end
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
            value={filteredTickets} // Use filteredTickets instead of tickets
            selectionMode="single"
            selection={selectedTicket}
            onSelectionChange={(e) => setSelectedTicket(e.value)}
          >
            <Column field="borrowerName" header="Borrower Name"></Column>
            <Column field="subject" header="Subject"></Column>
            <Column field="course" header="Course"></Column>
            <Column field="equipmentNames" header="Equipment Names"></Column>
            <Column field="roomID" header="Room No."></Column>
            <Column field="requestStatus" header="Request Status" body={(rowData) => getRequestStatus(rowData.requestStatus)}></Column>
            <Column field="returnStatus" header="Return Status" body={(rowData) => getReturnStatus(rowData.returnStatus)}></Column>
            <Column field="reportMonth" header="Month" body={(rowData) => getMonthName(rowData.reportMonth)}></Column>
            <Column field="reportYear" header="Year"></Column>
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
