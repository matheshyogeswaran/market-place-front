import axios from "axios";

const API_URL = "http://localhost:8082/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwtToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllBooks = async () => {
  console.log("JWT Token:", getAuthHeader().headers.Authorization); // debug
  try {
    const res = await axios.get(`${API_URL}/books/all`, getAuthHeader());
    console.log(res.data)
    return res.data;

  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addBook = async (book) => {
  try {
    const res = await axios.post(`${API_URL}/books`, book, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error(err);
  }
};