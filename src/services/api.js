import axios from 'axios';

const BASE_URL = 'https://t4e-testserver.onrender.com/api';

// Get token
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

// Get dataset (ROBUST VERSION)
export const getDataset = async (token, dataUrl) => {
  const response = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;

  // Handle ALL possible structures
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

// Fetch orders
export const fetchOrders = async () => {
  try {
    const { token, dataUrl } = await getToken(
      'SHARANYA V R',
      '148855'
    );

    console.log("DATA URL:", dataUrl); // DEBUG

    const dataset = await getDataset(token, dataUrl);

    console.log("FINAL DATA:", dataset); // DEBUG

    return dataset;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return [];
  }
};