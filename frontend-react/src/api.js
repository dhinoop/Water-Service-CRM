import axios from "axios";

const API = axios.create({
  baseURL: "https://water-service-crm.onrender.com/api",
  withCredentials: true
});

export default API;