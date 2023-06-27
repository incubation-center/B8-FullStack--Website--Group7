import jwtDecode from 'jwt-decode';
import createAxiosInstance from './axios';
import { API_ENDPOINT } from '@/utils/enum';

export interface Token {
  id: string;
  role: 'USER' | 'ADMIN';
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export const decodeToken = (token: any): Token | false => {
  try {
    return jwtDecode(token);
  } catch (err) {
    throw err; // fallback for invalid token
  }
};

export const isAdmin = (token: any): boolean => {
  if (!token) return false;

  const data = decodeToken(token);

  if (!data) return false;

  return data.role === 'ADMIN';
};

export const isTokenValid = async (token: any) => {
  if (!token) return false;

  const data = decodeToken(token);

  if (!data) return false;

  const { id } = data;

  const client = createAxiosInstance();

  const url =
    process.env.NEXT_PUBLIC_API_URL +
    API_ENDPOINT.AUTH.VALIDATE_TOKEN +
    `/${id}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const status = await res.json().then((res) => res.statusCode);

  return status === 'OK';
};
