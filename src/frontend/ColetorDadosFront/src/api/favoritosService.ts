import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/favoritos',
    headers: {
        'Content-Type': 'application/json',
    },
});


