import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",

    withCredentials: true,
});

// api.interceptors.request.use((config) =>{

//     const token = localStorage.getItem("access");

//     if (token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;


// });


// // Refresh token on 401
// api.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//         const orginalRequest = error.config;

//         if (
//             error.response?.status === 401 &&
//             !orginalRequest._retry
//         ) {
//             orginalRequest._retry = true;

//             const refresh = localStorage.getItem("refresh");

//             if (!refresh) {
//                 return Promise.reject(error);
//             }

//             try{
//                 const response = await axios.post(
//                     "http://127.0.0.1:8000/api/token/refresh/",
//                     {
//                         refresh,
//                     }
//                 );

//                 const newAccess = response.data.access;

//                 localStorage.setItem("access", newAccess);

//                 // Update Authorization header
//                 api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
//                 orginalRequest.headers.Authorization = `Bearer ${newAccess}`

//                 // Retry orginal request
//                 return api(orginalRequest);
//             } catch ( refreshError ) {
//                 localStorage.removeItem("access");
//                 localStorage.removeItem("refresh");

//                 // optional: redirect to login
//                 window.location.href = "/login";

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// api.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             !originalRequest.url.includes("token/refresh")
//         ){
//             originalRequest._retry = true;

//             try {
//                 await api.post("token/refresh/");

//                 return api(originalRequest);
//             } catch (refreshError) {

//                 window.location.href = "/login";
//                 return Promise.reject(refreshError);

//             }
//         }

//         return Promise.reject(error);
//     }
// );
 

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
                
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;