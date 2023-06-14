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
  login: (token: string, data: User) => void;
  logout: () => void;
}
