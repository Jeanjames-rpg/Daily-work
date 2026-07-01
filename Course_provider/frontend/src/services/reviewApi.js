import axios from "axios";

const reviewApi = axios.create({
    baseURL: "http://localhost:5000/api/"
});

export default reviewApi;