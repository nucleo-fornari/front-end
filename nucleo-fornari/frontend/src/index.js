import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
     <ToastContainer /> 
    <RouterProvider router={router} />
  </React.StrictMode>
);