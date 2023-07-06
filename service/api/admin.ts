import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';
import { Book, BookRequest, RequestCount } from '@/types';

const axiosClient: AxiosInstance = createAxiosInstance();

// request

export async function getAllRequestCount(): Promise<RequestCount> {
  try {
    const response = await axiosClient.get(
      API_ENDPOINT.ADMIN.GET_ALL_REQUEST_COUNT
    );

    const { data } = response;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllRequestAdmin(): Promise<BookRequest[]> {
  try {
    const response = await axiosClient.get(API_ENDPOINT.ADMIN.GET_ALL_REQUEST);

    const { data } = response;

    const bangkokOffset = 7 * 60; // Bangkok is UTC+7

    // format date
    data.forEach((request: any) => {
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

    return data;
  } catch (error) {
    // throw error;
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return [];
  }
}

export async function approveIncomingRequest(id: string) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.ADMIN.APPROVE_INCOMING_REQUEST(id)
    );

    if (response.status !== 200) throw new Error('Something went wrong');

    const { data: request } = response;

    // format date

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

    return request;
  } catch (error) {
    // throw error;
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
}

export async function rejectIncomingRequest(id: string, reason: string) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.ADMIN.REJECT_INCOMING_REQUEST(id),
      {
        reason
      }
    );

    if (response.status !== 200) throw new Error('Something went wrong');

    const { data: request } = response;

    // format date

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

    return request;
  } catch (error) {
    // throw error;
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
}

export async function receiveBook(id: string) {
  try {
    const res = await axiosClient.patch(API_ENDPOINT.ADMIN.RECEIVE_BOOK(id));

    if (res.status !== 200) throw new Error('Something went wrong');

    const { data } = res;

    return data;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
}

// upload book
export async function createBook(formData: Book): Promise<Book> {
  try {
    const res = await axiosClient.post(API_ENDPOINT.BOOK.CREATE_BOOK, formData);

    if (res.status !== 200) throw new Error('Something went wrong');

    const { data } = res;

    return data;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
}
