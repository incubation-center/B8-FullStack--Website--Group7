import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';

const axiosClient: AxiosInstance = createAxiosInstance();

// user info

export async function getUserInfo(token: string, id: string) {
  try {
    // it need to pass token to get user info
    // because it is being called in getServerSideProps
    const response = await axiosClient.get(API_ENDPOINT.USER.INFO(id), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
}
