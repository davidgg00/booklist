import axios from "axios";
const backendApi = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API,
});

export default backendApi;
