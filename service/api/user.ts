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

export async function getUserFavoriteBooks(token: string, id: string) {
  try {
    const response = await axiosClient.get(
      API_ENDPOINT.USER.GET_FAVORITES(id),
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserInfo(id: string, data: any) {
  try {
    const response = await axiosClient.patch(API_ENDPOINT.USER.INFO(id), data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(id: string, data: any) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.USER.CHANGE_PASSWORD(id),
      data
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function saveBookToFavorites(userId: string, bookId: string) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.USER.BOOK_TO_FAVORITES(userId, bookId)
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function removeBookFromFavorites(userId: string, bookId: string) {
  try {
    const response = await axiosClient.delete(
      API_ENDPOINT.USER.BOOK_TO_FAVORITES(userId, bookId)
    );

    return response;
  } catch (error) {
    throw error;
  }
}
