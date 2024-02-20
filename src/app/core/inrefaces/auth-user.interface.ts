export interface AuthUser {
  email: string;
  password: string;
}

export interface User {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
