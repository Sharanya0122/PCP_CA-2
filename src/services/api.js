import axios from 'axios';

const BASE_URL = 'https://t4e-testserver.onrender.com/api';


export const getToken = async (
  studentId = 'SHARANYA V R',
  password = '148855'
) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data && data.data && data.data.orders) {
    return data.data.orders;
  }

  if (data && data.data) {
    return data.data;
  }

  return data;
};

export const fetchOrders = async () => {
  try {
    const { token, dataUrl } = await getToken(
      'SHARANYA V R',
      '148855'
    );


    const dataset = await getDataset(token, dataUrl);

    return dataset;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return []; /
  }
};