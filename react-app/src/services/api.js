import axios from 'axios';

// Функция для получения текущего токена из localStorage
const getToken = () => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  return userToken?.access;
};

// Создание экземпляра axios с базовым URL и глобальными заголовками
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Использование интерсептора для добавления токена ко всем исходящим запросам
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
