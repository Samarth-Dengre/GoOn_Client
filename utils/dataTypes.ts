import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string | JSX.Element;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export interface Order {
  _id: string;
  total: string;
  orderStatus: string;
  orderProducts: { product: Product; quantity: number }[];
  modeOfPayment: string;
}

export interface User {
  userName?: string;
  email?: string;
  userCartProducts?: { product: Product; quantity: number }[];
  orders?: Order[];
}

export interface Product {
  _id: string;
  productName: string;
  productDescription?: string;
  productMRP: number;
  productImage: string[];
  productStore?: Store[];
  productrating?: {
    rating: number;
    numReviews: number;
  };
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  token: string;
  login: (data: User, token: string, cartSize: number) => void;
  logout: () => void;
  cartSize: number;
  addToCart: (
    product: Product,
    quantity: number,
    seller: string
  ) => Promise<boolean>;
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
  storeImage: string;
  storeDescription?: string[];
  storeProducts?: { product: Product; price: number }[];
  storerating: {
    rating: number;
    numReviews: number;
  };
}

export interface CartItems {
  product: Product;
  seller: {
    id: string;
    sellerName: string;
    price: number;
    quantity: number;
  };
}
