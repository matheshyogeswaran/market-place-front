import axios from "axios";

const API_URL = "http://localhost:8083/api/orders/create";

export const createOrder = async (bookId, quantity) => {

  const token = localStorage.getItem("jwtToken");

  const response = await axios.post(
    API_URL,
    {
      bookId: bookId,
      quantity: quantity
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};