import { ReactNode } from "react";

export interface IItemCard {
  children?: ReactNode;
  id?: number;
  price: number;
  title: string;
  thumbnail: string;
}

