import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthInitialState {
  user: UserInfoTypes | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
  token: string | null;
}
