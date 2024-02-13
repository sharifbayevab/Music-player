import axios from 'axios';
import axiosInstance from './api';

const API_URL = 'http://localhost:8000/api/token/';
const REGISTER_URL = 'http://localhost:8000/accounts/user-register/';
const USER_DATA_URL = '/accounts/user-register/';

const login = (username, password) => {
  return axios.post(API_URL, { username, password })
    .then(async (response) => {
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
        await refreshUserData();
      }
      return response.data;
    });
};

const register = (username, email, password) => {
  return axios.post(REGISTER_URL, { username, email, password })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return login(username, password);
      } else {
        throw new Error('Регистрация не удалась');
      }
    })
    .catch(error => {
      console.error('Ошибка при регистрации:', error);
      throw error;
    });
};


const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userData');
};

const refreshUserData = async () => {
  try {
    const userData = await axiosInstance.get(USER_DATA_URL);
    localStorage.setItem('userData', JSON.stringify(userData.data));
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
  }
};

const authService = {
  login,
  register,
  logout,
  refreshUserData, // Добавление функции обновления данных пользователя
};

export default authService;
