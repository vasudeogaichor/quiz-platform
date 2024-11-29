import { IUser } from "../models/User";

// tokenStore.ts
let token: string | null = null;
let user: Partial<IUser> | null = null;

export const setToken = (newToken: string) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};

export const setUser = (newUser: Partial<IUser>) => {
    user = newUser;
    console.log('user - ', user);
};