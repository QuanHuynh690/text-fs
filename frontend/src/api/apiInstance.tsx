import axios from "axios";

const apiUrl = process.env.API || "http://localhost:3001";

export const api = axios.create({
  baseURL: apiUrl,
});
