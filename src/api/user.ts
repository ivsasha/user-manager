import axios from 'axios';
import { User, UserFormData } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(API_URL);

  return data;
};

export const createUser = async (user: UserFormData): Promise<User> => {
  const { data } = await axios.post<User>(API_URL, user);

  return data;
};

export const updateUser = async (
  id: number,
  user: UserFormData,
): Promise<User> => {
  const { data } = await axios.patch<User>(`${API_URL}/${id}`, user);

  return data;
};
