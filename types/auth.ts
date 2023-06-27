import { User } from '.';

export type UserLoginInputs = {
  email: string;
  password: string;
};

export type UserRegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  profileUrl?: string;
};

export type AuthStore = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: User | null;
};
