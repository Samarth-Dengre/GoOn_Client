import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export interface User {
  userName?: string;
  email?: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  token: string;
  login: (data: User, token: string) => void;
  logout: () => void;
}

export interface Category {
  _id: string;
  categoryName: string;
}
export interface Store {
  _id: string;
  storeName: string;
  storeAddress: string;
  storeContact: string;
  storeEmail: string;
  isVerified: boolean;
  storeCategory: Category[];
}
