import axios from 'axios';

const BASE_URL = 'https://t4e-testserver.onrender.com/api';


export const getToken = async (
  studentId = 'SHARANYA',
  password = '148855'
) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const response = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;

  if (data?.data?.orders) {
    return data.data.orders;
  }

  if (data?.orders) {
    return data.orders;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data)) {
    return data;
  }

  console.log("Unexpected API structure:", data);
  return [];
};


export const fetchOrders = async () => {
  try {
    const { token, dataUrl } = await getToken(
      'SHARANYA',
      '148855'
    );

    console.log("DATA URL:", dataUrl);

    const dataset = await getDataset(token, dataUrl);

    console.log("FINAL DATA:", dataset);

    return dataset;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return [];
  }
};