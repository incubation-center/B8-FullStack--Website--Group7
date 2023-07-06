import { AxiosInstance } from "axios";

import { API_ENDPOINT } from "../../utils/enum";
import createAxiosInstance from "../axios";
import { Book } from "@/types";

const axiosClient: AxiosInstance = createAxiosInstance();

export async function getAllBooks(): Promise<Book[]> {
  try {
    const response = await axiosClient.get(API_ENDPOINT.BOOK.GET_ALL_BOOKS);

    const { data } = response;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(id: string): Promise<Book> {
  try {
    const response = await axiosClient.get(
      API_ENDPOINT.BOOK.GET_BOOK_BY_ID(id)
    );

    const { data } = response;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateBookById(id: string, formData: any) {
  try {
    const response = await axiosClient.patch(
      API_ENDPOINT.BOOK.UPDATE_BOOK_BY_ID(id),
      formData
    );

    return response;
  } catch (error) {
    throw error;
  }
}
