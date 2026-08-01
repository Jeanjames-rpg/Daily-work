import axios from "axios";

const reviewApi = axios.create({
    baseURL: process.env.REACT_APP_REVIEW_API_URL,
    withCredentials:true,
});

// reviewApi.interceptors.request.use((config) => {

//     const token = localStorage.getItem("access");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default reviewApi;