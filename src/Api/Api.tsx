import axios from 'axios';

const API_URL = 'http://192.168.0.104:3000'; 

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
      'Content-Type': 'application/json',
    },
  });

interface UserCredentials {
    username: string;
    email: string;
    password: string;
  }

export const registerUser = async ({username, email, password}: UserCredentials) => {
  try {
    const response = await api.post('/auth/register', {
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

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar sesión');
  }
};
