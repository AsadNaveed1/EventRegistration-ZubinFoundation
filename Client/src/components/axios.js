import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://dsehero.com'  // This is your production API base URL
    baseURL: 'http://localhost:8000'  // This is your production API base URL
});

export default axiosInstance;