import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WebSocketProvider } from './context/webSocketContext';
import { LoadingProvider } from './context/LoadingContext';
import Loading from './components/loading/Loading';
import { useLoadingContext } from './context/LoadingContext';

const App = () => {
    const { loading } = useLoadingContext();

    return (
        <>
            {loading && <Loading />}
            <WebSocketProvider>
                <ToastContainer />
                <RouterProvider router={router} />
            </WebSocketProvider>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LoadingProvider>
            <App />
        </LoadingProvider>
    </React.StrictMode>
);