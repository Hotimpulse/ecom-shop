export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface ICart {
  quantity: string | undefined;
  title: string;
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
}

export interface IUserCarts {
  carts: ICartsData;
  status: string;
}

