import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from'./pages/Login/Login.jsx'
import Request from './pages/Request/Request.tsx';
import Ticket from'./pages/Request/Ticket/Ticket.tsx';
import Admin from './pages/Admin/Admin.jsx';
import Equipments from './pages/Admin/Equipments/equipments.tsx'
import Equipandtools from './pages/Admin/Equipments/Allequips/Equipandtools.jsx';
import Report from './pages/Admin/Reports/Reports.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Request",
    element: <Request />,
  },

  {
    path: "/Ticket",
    element: <Ticket />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Equipments",
    element: <Equipments />,
  },
  {
    path: "/Equipandtools",
    element: <Equipandtools />,
  },
  {
    path: "/Reports",
    element: <Report />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
