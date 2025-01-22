import axios from 'axios';

const API_URL = 'http://192.168.0.103'; // Cambia esto por tu URL real del backend

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 segundos para el timeout
  });

interface UserCredentials {
    username: string;
    email: string;
    password: string;
  }

export const registerUser = async ({username, email, password}: UserCredentials) => {
  try {
    const response = await api.post(`${API_URL} auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al registrar usuario');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`${API_URL} auth/login`, {
      email,
      password,
    });
    return response.data; // Esto debe contener el token JWT
  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar sesión');
  }
};
