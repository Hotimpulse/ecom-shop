export interface IProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface IProductsData {
  products: IProduct[];
  total?: number;
  skip: number;
  limit: number;
}

export interface IProducts {
  products: IProductsData;
  status: string; // 'loading', 'error', 'ready'
}
