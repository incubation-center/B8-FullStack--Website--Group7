import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';
import { BookRequest } from '@/types';

const axiosClient: AxiosInstance = createAxiosInstance();

// request

export async function getAllRequestAdmin(): Promise<BookRequest[]> {
  try {
    const response = await axiosClient.get(API_ENDPOINT.ADMIN.GET_ALL_REQUEST);

    const { data } = response;

    return data;
  } catch (error) {
    // throw error;
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return [];
  }
}
