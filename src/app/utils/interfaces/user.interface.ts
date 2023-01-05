export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

export interface UserInfoTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
  address?: string;
  phone?: string;
  createdAt: Date;
}
