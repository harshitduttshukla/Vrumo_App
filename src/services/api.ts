import axios from 'axios';
import { Platform } from 'react-native';
import { getToken } from '../utils/storage';

const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.22.50.160:8000' 
  : 'http://10.22.50.160:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Inject Token into every request
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getServices = async () => {
  return api.get('/api/services');
};

export const getMe = async () => {
  return api.get('/auth/me');
};

export const sendOtp = async (phone: string) => {
  return api.post('/auth/send-otp', { phone_number: phone });
};

export const verifyOtp = async (phone: string, otp: string) => {
  return api.post('/auth/verify-otp', { phone_number: phone, otp_code: otp });
};

export const createBooking = async (bookingData: any) => {
  return api.post('/api/bookings', bookingData);
};

export const updateProfile = async (name: string, email: string) => {
  return api.put('/auth/update-profile', { name, email });
};

export default api;
