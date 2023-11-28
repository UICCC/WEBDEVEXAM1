import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import './Admin.css'; // Import the CSS file
import { PanelMenu } from 'primereact/panelmenu';
import {useNavigate} from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function Admin() {

  const navigate = useNavigate();
  const handleloginClick = () => navigate('/');
  const handleReportsClick = () => navigate('/Reports');
  const handlEquipandtoolsClick = () => navigate('/Equipandtools');
  const handlePendingClick = () => navigate('/Pending');
    const itemsadmin = [
        
        {
            label: <div className='navbartexts' onClick={handleloginClick}>Home </div>,
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
          label: <div className='navbartexts' onClick={handlEquipandtoolsClick}>Equipments </div>,
            icon: 'pi pi-fw pi-calendar',
            
        },
        {
          label: <div className='navbartexts'onClick={handlePendingClick}>Pendings </div>,
            icon: 'pi pi-fw pi-user-plus'
        }
    ];


    const panelMenuitems = [
        {
            label: <div className='panelmenu-bar'>Students </div>,
            icon:  'pi pi-fw pi-user',
           
        },
        {
            label: <div className='panelmenu-bar' onClick={handlEquipandtoolsClick}>Equipments </div>,
            icon: 'pi pi-fw pi-shopping-cart',
            
        },
        {
            label: <div className='panelmenu-bar'onClick={handleReportsClick}>Reports </div>,
            icon: 'pi pi-fw pi-envelope',
           
        },
        
       
    ];

    const initialCategories = [
      {
        time: "7:30 AM",
        id: 1,
        name: "Drake Zee",
        equipment: "Equipment",
        course: "BSCS-2A",
        date: "29-nov-2023",
        duedate: "29-nov-2023",
        status: "ongoing"
        
      },
        
       
      ];
    
      const [categories, setCategories] = useState(initialCategories);
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [newCategory, setNewCategory] = useState({ id: '', name: '', equipment: '', });
    
      const handleEdit = () => {
        if (selectedCategory) {
          const updatedCategories = categories.map(category => {
            if (category.id === selectedCategory.id) {
              return selectedCategory;
            }
            return category;
          });
          setCategories(updatedCategories);
          setSelectedCategory(null);
        }
      };
    
      const handleDelete = () => {
        if (selectedCategory) {
          setCategories(categories.filter(category => category.id !== selectedCategory.id));
          setSelectedCategory(null);
        }
      };
    
      const handleAdd = () => {
        if (newCategory.name && newCategory.equipment) {
          setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
          setNewCategory({ id: '', name: '', equipment: '' });
        }
      };

    

    

    
    

    return (
        <>

        

        <div className="vl"></div>

        
        
        
        
        <div className="wh">
            <Menubar model={itemsadmin} start={<h1 className="admin-header">Admin</h1>}
                end={<InputText placeholder="Search" type="text" className="search-input" />} />
        </div>


       

        
        <div className="sidebar-menu">
                <div className="trythis">
                    <PanelMenu className='sidebar-menu-options' model={panelMenuitems} />
                </div>
            </div>
        


              
      <div className="master-detail-container">
        <div className="master-section">
          <DataTable
            value={categories}
            selectionMode="single"
            selection={selectedCategory}
            onSelectionChange={(e) => setSelectedCategory(e.value)}
          >
            <Column field="time" header="Time"></Column>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="equipment" header="Equipment"></Column>
            <Column field="course" header="Course"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="duedate" header="DueDate"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
        <div className="detail-section">
          {selectedCategory && (
            <div>
              <h2>Edit Category</h2>
              <InputText
                value={selectedCategory.time}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.time = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
              <InputText
                value={selectedCategory.name}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.name = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
              <InputText
                value={selectedCategory.equipment}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.equipment = e.target.value;
                  setSelectedCategory(updatedCategory);
                  
                }}
              />
              <InputText
                value={selectedCategory.course}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.course = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
               <InputText
                value={selectedCategory.date}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.date = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
              <InputText
                value={selectedCategory.duedate}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.duedate = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
               <InputText
                value={selectedCategory.status}
                onChange={(e) => {
                  const updatedCategory = { ...selectedCategory };
                  updatedCategory.status = e.target.value;
                  setSelectedCategory(updatedCategory);
                }}
              />
              <Button label="Save" icon="pi pi-check" onClick={handleEdit} />
              <Button label="Delete" icon="pi pi-trash" onClick={handleDelete} />
            </div>
          )}
          <div className='holderName'>
            <h2>Add Category</h2>
            <InputText
              value={newCategory.time}
              onChange={(e) => setNewCategory({ ...newCategory, time: e.target.value })}
              placeholder="Time"
            />
            <InputText
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Name"
            />
            <InputText
              value={newCategory.equipment}
              onChange={(e) => setNewCategory({ ...newCategory, equipment: e.target.value })}
              placeholder="Equipment"
            />
            <InputText
              value={newCategory.course}
              onChange={(e) => setNewCategory({ ...newCategory, course: e.target.value })}
              placeholder="Course"
            />
            <InputText
              value={newCategory.date}
              onChange={(e) => setNewCategory({ ...newCategory, date: e.target.value })}
              placeholder="Date"
            />
            <InputText
              value={newCategory.duedate}
              onChange={(e) => setNewCategory({ ...newCategory, duedate: e.target.value })}
              placeholder="DueDate"
            />
            <InputText
              value={newCategory.status}
              onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
              placeholder="Status"
            />
            <Button label="Add" icon="pi pi-plus" onClick={handleAdd} />
          </div>
        </div>
      </div>
      
          
            
            
            </>

    );
}

export default Admin;
