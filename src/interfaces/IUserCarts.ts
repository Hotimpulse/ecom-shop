export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail?: string;
  children?: React.ReactNode;
  isDeleted?: boolean;
}

export interface ICart {
  id: number;
  products: ICartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartsData {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
  status: string;
}
