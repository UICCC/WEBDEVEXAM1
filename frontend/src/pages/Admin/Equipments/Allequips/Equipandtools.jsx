import './Equipandtools.css'
import { Menubar } from 'primereact/menubar';


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
   

    return(
        <>

        <div className='asdasd'></div>
        <div>
        <Menubar className='tools-navbar-text-2' model={items} />
        </div>

        <h1 className='toolstitile'> Equipments and Tools</h1>

        
        </>
    )
}
export default Equipandtools