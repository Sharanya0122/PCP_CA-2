import axios from 'axios';

const API_URL = 'https://t4e-testserver.onrender.com/api';

export const getToken = async (studentId, password) => {
  const response = await axios.post(`${API_URL}/public/token`, {
    studentId,
    password
  });
  return response.data;
};

export const fetchOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
