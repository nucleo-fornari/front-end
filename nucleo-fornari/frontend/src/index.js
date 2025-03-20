import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { AuthProvider } from "./AuthProvider";
import { WebSocketProvider } from "./context/webSocketContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </WebSocketProvider>
  </React.StrictMode>
);