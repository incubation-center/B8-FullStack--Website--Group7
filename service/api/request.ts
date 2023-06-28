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

export async function getAllRequest(userId: string) {
  const url = API_ENDPOINT.REQUEST.GET_ALL_REQUEST(userId);

  try {
    const response = await axiosClient.get(url);
    const { data: responseData } = response;

    // format date
    responseData.forEach((request: any) => {
      request.dateOfRequest = request.dateOfRequest
        ? new Date(request.dateOfRequest)
        : null;
      request.dateOfAccepted = request.dateOfAccepted
        ? new Date(request.dateOfAccepted)
        : null;

      request.dateOfReturn = request.dateOfReturn
        ? new Date(request.dateOfReturn)
        : null;
      request.dateOfReceived = request.dateOfReceived
        ? new Date(request.dateOfReceived)
        : null;
    });

    return responseData;
  } catch (error) {
    throw error;
  }
}
