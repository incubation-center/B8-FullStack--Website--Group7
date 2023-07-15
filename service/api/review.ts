import { AxiosInstance } from 'axios';

import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';

const axiosClient: AxiosInstance = createAxiosInstance();

const formattingReview = (review: any) => {
  review.timestamp = new Date(review.timestamp);
  if (review.reviewer) return;
  review.reviewer = review.reveiwer; // in case wrong spelling

  return review;
};

// review
export async function getAllReviews(bookId: string) {
  try {
    const response = await axiosClient.get(
      API_ENDPOINT.REVIEW.GET_ALL_REVIEWS(bookId)
    );

    const { data } = response;

    data.forEach((review: any) => formattingReview(review));

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addReview({
  userId,
  bookId,
  rating,
  comment
}: {
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
}) {
  try {
    const response = await axiosClient.post(
      API_ENDPOINT.REVIEW.CREATE_REVIEW({ userId, bookId, rating, comment })
    );

    const { data } = response;

    return formattingReview(data);
  } catch (error) {
    throw error;
  }
}

export async function updateReview(
  reviewId: string,
  {
    rating,
    comment
  }: {
    rating: number;
    comment: string;
  }
) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.REVIEW.UPDATE_REVIEW(reviewId, {
        rating,
        comment
      })
    );

    const { data } = response;

    return formattingReview(data);
  } catch (error) {
    throw error;
  }
}

export async function reactToReview(
  reviewId: string,
  userId: string,
  action: 'like' | 'dislike'
) {
  try {
    const response = await axiosClient.post(
      API_ENDPOINT.REVIEW.REACTION(reviewId, userId, action)
    );

    const { data } = response;

    return formattingReview(data);
  } catch (error) {
    throw error;
  }
}

export async function removeReaction(
  reviewId: string,
  userId: string,
  action: 'like' | 'dislike'
) {
  try {
    const response = await axiosClient.delete(
      API_ENDPOINT.REVIEW.REACTION(reviewId, userId, action)
    );

    const { data } = response;

    return formattingReview(data);
  } catch (error) {
    throw error;
  }
}
