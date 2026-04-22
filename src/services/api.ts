import axios from 'axios';
import { Platform } from 'react-native';
import { getToken } from '../utils/storage';

const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.240.175.160:8000' 
  : 'http://10.240.175.160:8000';

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

export const sendOtp = async (email: string) => {
  return api.post('/auth/send-otp', { email });
};

export const verifyOtp = async (email: string, otp: string) => {
  return api.post('/auth/verify-otp', { email, otp_code: otp });
};

export const login = async (emailOrPhone: string, password: string) => {
  return api.post('/auth/login', { email_or_phone: emailOrPhone, password });
};

export const registerUser = async (name: string, emailOrPhone: string, password: string) => {
  return api.post('/auth/register', { name, email_or_phone: emailOrPhone, password });
};

export const oauthLogin = async (email: string, name: string, provider: string, token: string) => {
  return api.post('/auth/oauth-login', { email, name, provider, provider_token: token });
};

export const googleLogin = async (idToken: string) => {
  return api.post('/auth/google', { token: idToken });
};

export const createBooking = async (bookingData: any) => {
  return api.post('/api/bookings', bookingData);
};

export const updateProfile = async (
  name: string, 
  email: string, 
  latitude?: number, 
  longitude?: number,
  vehicle_type?: string,
  vehicle_seats?: string
) => {
  return api.put('/auth/update-profile', { 
    name, 
    email, 
    latitude, 
    longitude,
    vehicle_type,
    vehicle_seats
  });
};

export const getUserBookings = async (userId: string) => {
  return api.get(`/api/bookings/user/${userId}`);
};

export default api;
