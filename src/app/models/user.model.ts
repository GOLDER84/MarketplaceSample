export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  age: number;
  credit: number;
  email: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  age: number;
  credit: number;
  email: string;
}
export interface EditUserRequest {
  Name: string;
  Username: string;
  Password: string;
  Age: number;
  Email: string;
}
export interface AddCreditRequest {
  Username: string;
  Amount: number;
}
