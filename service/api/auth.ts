import { AxiosInstance } from 'axios';

import { UserLoginInputs, UserRegisterInputs } from '../../types/auth';
import { API_ENDPOINT } from '../../utils/enum';
import createAxiosInstance from '../axios';

const axiosClient: AxiosInstance = createAxiosInstance();

// auth
export async function AuthLogin({ email, password }: UserLoginInputs) {
  try {
    const response = await axiosClient.post(API_ENDPOINT.AUTH.LOGIN, {
      email,
      password
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AuthRegister(formData: UserRegisterInputs) {
  try {
    const response = await axiosClient.post(
      API_ENDPOINT.AUTH.REGISTER,
      formData
    );

    return response;
  } catch (error) {
    throw error;
  }
}
