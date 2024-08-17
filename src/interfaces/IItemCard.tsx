import { ReactNode } from "react";

export interface IItemCard {
  id: number;
  price: number;
  title: string;
  thumbnail: string;
  children?: ReactNode;
}

