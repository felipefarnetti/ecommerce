import { JSX } from "react";

export type MenuItems = {
  href: string;
  icon: JSX.Element;
  label: string;
};

export type NewUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type EmailVerifyRequest = {
  token: string;
  userId: string;
};

export type ForgetPasswordRequest = {
  email: string;
};

export type UpdatePasswordRequest = {
  token: string;
  userId: string;
  password: string;
};

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  verified: boolean;
}

export interface NewProductInfo {
  title: string;
  description: string;
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  quantity: number;
  thumbnail?: File;
  images: File[];
}

export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  bulletPoints?: string[];
  images?: {
    url: string;
    id: string;
  }[];
  thumbnail: {
    url: string;
    id: string;
  };
  category: string;
}

export interface ProductToUpdate {
  title: string;
  description: string;
  bulletPoints: string[];
  category: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  thumbnail?: { url: string; id: string };
  images?: { url: string; id: string }[];
}

export interface NewCartRequest {
  productId: string;
  quantity: number;
}

export interface NewFeaturedProduct {
  banner: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}

export interface FeaturedProductForUpdate {
  banner?: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}
export interface UserProfileToUpdate {
  avatar?: { url: string; id: string };
  name: string;
  id: string;
}

interface CartProduct {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  totalPrice: number;
  qty: number;
}

export interface CartItems {
  products: CartProduct[];
  id: string;
  totalQty: number;
  totalPrice: number;
}
