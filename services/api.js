// services/api.js
import axios from "axios";

// se estiver testando no mesmo PC, na web:
const API_BASE_URL = "http://127.0.0.1:8000"; // ou http://localhost:8000

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export default api;
