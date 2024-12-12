import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  email: string;
  password: string;
  name: string;
};
export const login = async (data: LoginType) => {
  const response = await axios.post(`${API_URL}/users/login`, data);
  return response.data;
};

export const register = async (data: RegisterType) => {
  const response = await axios.post(`${API_URL}/users/register`, data);
  return response.data;
};

