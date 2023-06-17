import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
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

export interface Product {
  _id: string;
  productName: string;
  productDescription?: string;
  productPrice: string;
  productImage: string;
  productStore?: Store;
  productrating: {
    rating: number;
    numReviews: number;
  };
}
export interface Store {
  _id: string;
  storeName: string;
  storeAddress: string;
  storeContact: string;
  storeEmail: string;
  isVerified: boolean;
  storeCategory: Category[];
  storeImage: string;
  storeDescription?: string[];
  storeProducts?: Product[];
  storerating: {
    rating: number;
    numReviews: number;
  };
}
