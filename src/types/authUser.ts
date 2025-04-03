export interface User {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
}

export interface AuthInfo {
  email: string;
  password: string;
}

export interface SuccessfulResult {
  result: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}
