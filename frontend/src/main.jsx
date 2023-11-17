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
<<<<<<< HEAD
import Admin from './pages/Admin/Admin.tsx';
=======
>>>>>>> 4fae8421ade314efc1e9722e8139f515857ccd14


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
<<<<<<< HEAD

=======
>>>>>>> 4fae8421ade314efc1e9722e8139f515857ccd14
  {
    path: "/Ticket",
    element: <Ticket />,
  },
<<<<<<< HEAD
  {
    path: "/Admin",
    element: <Admin />,
  },

=======
>>>>>>> 4fae8421ade314efc1e9722e8139f515857ccd14
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
