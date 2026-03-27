import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.error('Error storing token', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.error('Error getting token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.error('Error removing token', e);
  }
};

export const storeUser = async (user: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  } catch (e) {
    console.error('Error storing user data', e);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Error getting user data', e);
    return null;
  }
};
