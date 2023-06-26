import { MouseEventHandler } from "react";

export interface LoginFormProps {
  email: string;
  password: string;
}

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
  productDescription: string[];
  productMRP: number;
  productImage: string[];
  productrating: {
    rating: number;
    numReviews: number;
  };
  productStores: { store: Store; price: number }[];
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  token: string;
  login: (formData: LoginFormProps) => void;
  logout: () => void;
  cartSize: number;
  setCartSize: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (
    product: string,
    quantity: number,
    seller: string
  ) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error" | "info">
  >;
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
  storeProducts: { product: Product; price: number }[];
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

export interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}
