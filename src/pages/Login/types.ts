import { User } from "firebase/auth";

export interface IUserData {
    name: string,
    email: string,
    password: string,
}

export interface ILogin {
    user: User | null;
  }