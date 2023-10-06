// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Adjust to your Rails API endpoint if different
});

export default instance;
