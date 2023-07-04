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

export async function AuthRefreshToken(refreshToken: string) {
  try {
    const response = await axiosClient.post(API_ENDPOINT.AUTH.REFRESH_TOKEN, {
      Headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AuthForgotPassword(email: string) {
  try {
    const response = await axiosClient.post(
      API_ENDPOINT.USER.FORGOT_PASSWORD(email)
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AuthResetPassword({
  userId,
  newPassword,
  resetPwdToken
}: {
  userId: string;
  newPassword: string;
  resetPwdToken: string;
}) {
  try {
    const response = await axiosClient.post(API_ENDPOINT.USER.RESET_PASSWORD, {
      userId,
      newPassword,
      resetPwdToken
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AuthValidateResetPasswordToken(
  resetPwdToken: string
): Promise<boolean> {
  try {
    const response = await axiosClient.post(
      API_ENDPOINT.AUTH.VALIDATE_RESET_PASSWORD_TOKEN(resetPwdToken)
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
