import axios from "axios";

const token = process.client ? localStorage.getItem("token") : "";

export const HTTP = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
