import axios from "axios";

const reviewApi = axios.create({
    baseURL: "http://localhost:5000/api/"
});

reviewApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default reviewApi;