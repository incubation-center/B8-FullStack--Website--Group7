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
  value: string;
  isExpired: boolean;
}

export const decodeToken = (token: any): Token | null => {
  try {
    if (!token) return null;

    const data = jwtDecode(token) as Token;

    if (!data) return null;

    const isExpired = Date.now() >= data.exp * 1000;

    return {
      ...data,
      value: token,
      isExpired
    };
  } catch (err) {
    // throw err; // fallback for invalid token
    return null;
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
      if (tokenData.isExpired) {
        return {
          isLoggedIn: false,
          isAdmin: false,
          user: null,
          isFetched: true
        };
      }

      const fetchUserInfo = getUserInfo(token, tokenData.id);
      const fetchTokenValidation = isTokenValid(token);

      // promise allSettled
      const [userInfoRes, tokenValidationRes] = await Promise.allSettled([
        fetchUserInfo,
        fetchTokenValidation
      ]);

      if (userInfoRes.status === 'fulfilled') {
        user = userInfoRes.value.data;
        isLoggedIn = true;
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
