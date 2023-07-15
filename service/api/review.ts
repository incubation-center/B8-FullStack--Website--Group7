import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';

const axiosClient: AxiosInstance = createAxiosInstance();

// review
export async function getAllReviews(bookId: string) {
  try {
    const response = await axiosClient.get(
      API_ENDPOINT.REVIEW.GET_ALL_REVIEWS(bookId)
    );

    const { data } = response;

    data.forEach((review: any) => {
      review.timestamp = new Date(review.timestamp);
      if (review.reviewer) return;
      review.reviewer = review.reveiwer; // in case wrong spelling
    });

    return data;
  } catch (error) {
    throw error;
  }
}
