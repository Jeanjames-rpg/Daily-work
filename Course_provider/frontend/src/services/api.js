import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    withCredentials: true,
});


 

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const url = originalRequest.url;

        // checking for if its an authentication endpoint and if it is ignore the error

        if (
            url.includes("login") || url.includes("logout") || url.includes("token/refresh") 
        ) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 && 
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await api.post("token/refresh/");

                return api(originalRequest);
            } catch (refreshError) {
                
                // window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;