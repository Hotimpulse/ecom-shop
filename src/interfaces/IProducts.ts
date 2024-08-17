export interface IProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface IProductsData {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProducts {
  append: boolean;
  input: string;
  products: IProductsData;
  status: string; // 'loading', 'error', 'ready'
}
