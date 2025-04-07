import { useEffect } from 'react';
import api from '../services/api';
import { useLoadingContext } from '../context/LoadingContext';

const useApi = () => {
    const { startLoading, stopLoading } = useLoadingContext();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(config => {
            startLoading();
            return config;
        }, error => {
            stopLoading();
            return Promise.reject(error);
        });

        const responseInterceptor = api.interceptors.response.use(response => {
            stopLoading();
            return response;
        }, error => {
            stopLoading();
            return Promise.reject(error);
        });

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [startLoading, stopLoading]);

    return api;
};

export default useApi;