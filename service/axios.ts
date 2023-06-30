import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

// create asn axios instance function
export default function createAxiosInstance(): AxiosInstance {
  const token = getCookie('accessToken');

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  // write an axios interceptors response handler
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return client;
}
