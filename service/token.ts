import jwtDecode from 'jwt-decode';
import createAxiosInstance from './axios';
import { API_ENDPOINT } from '@/utils/enum';
import { getUserInfo } from './api/user';
import { AuthStore } from '@/types/auth';

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

export const isUserAdmin = (token: any): boolean => {
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
    process.env.NEXT_PUBLIC_API_URL! + API_ENDPOINT.AUTH.VALIDATE_TOKEN(id);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const status = await res.json().then((res) => res.statusCode);

  return status === 'OK';
};

export const processUserToken = async (token: any): Promise<AuthStore> => {
  let isLoggedIn = false;
  let isAdmin = false;
  let user = null;

  if (token) {
    const tokenData = decodeToken(token);

    if (tokenData) {
      isLoggedIn = true;

      const fetchUserInfo = getUserInfo(token, tokenData.id);
      const fetchTokenValidation = isTokenValid(token);

      // promise allSettled
      const [userInfoRes, tokenValidationRes] = await Promise.allSettled([
        fetchUserInfo,
        fetchTokenValidation
      ]);

      if (userInfoRes.status === 'fulfilled') {
        user = userInfoRes.value.data;
      }

      let tokenValidation = false;
      if (tokenValidationRes.status === 'fulfilled') {
        tokenValidation = tokenValidationRes.value;
      }

      const adminValidation = isUserAdmin(token);

      if (adminValidation && tokenValidation) {
        isAdmin = true;
      }
    }
  }

  return {
    isLoggedIn,
    isAdmin,
    user,
    isFetched: true
  };
};
