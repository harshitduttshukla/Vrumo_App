import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.vrumo.in', // Mock API
  timeout: 10000,
});

export const getServices = async () => {
  // return api.get('/api/services');
  return { data: [] }; // Mock response
};

export const createBooking = async (bookingData: any) => {
  // return api.post('/api/bookings', bookingData);
  return { status: 201 }; // Mock response
};

export default api;
