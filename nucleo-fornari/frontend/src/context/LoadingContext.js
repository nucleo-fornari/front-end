// context/LoadingContext.js
import { createContext, useContext } from 'react';
import useLoading from '../hooks/useLoading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const loadingState = useLoading();

    return (
        <LoadingContext.Provider value={loadingState}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => useContext(LoadingContext);