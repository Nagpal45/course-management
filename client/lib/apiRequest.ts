import axios from 'axios';

const apiRequest = axios.create({
    baseURL: "https://course-management-ssmo.vercel.app/api",
    withCredentials: true
})

export default apiRequest;
