import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';
import { Book } from '@/types';

const axiosClient: AxiosInstance = createAxiosInstance();

export async function createRequest(data: any) {
  const url =
    API_ENDPOINT.REQUEST.CREATE_REQUEST +
    '?bookId=' +
    data.bookId +
    '&userId=' +
    data.userId +
    '&requestDuration=' +
    data.requestDuration;

  try {
    const response = await axiosClient.post(url);
    const { data: responseData } = response;

    return responseData;
  } catch (error) {
    throw error;
  }
}
