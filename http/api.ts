import axios from 'axios';

const api = axios.create({
    baseURL: `https://api.limitless-connection.com/api/v1/`,
});

export default api;
