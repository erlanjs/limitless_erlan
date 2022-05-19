import axios from 'axios';
import {setAuth} from "../store/reducers/auth";
import api from "./api";
import {store} from "../pages/_app";


const authApi = axios.create({
    baseURL: `https://api.limitless-connection.com/api/v1/`,
});

authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    return config;
})

authApi.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await api.post(`/users/refresh/`, {
                refresh: localStorage.getItem('refresh'),
            });
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            store.dispatch(setAuth(true));
            return authApi.request(originalRequest);
        } catch (e) {
            store.dispatch(setAuth(false));
            return Promise.reject(error);
        }
    }
    if(error.config._isRetry){
        store.dispatch(setAuth(false));
    }
    return Promise.reject(error);
});

export default authApi;
