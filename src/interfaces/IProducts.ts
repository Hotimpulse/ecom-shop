export interface IProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  description?: string;
  category?: string;
  rating?: number;
  stock: number;
  tags?: [""];
  brand?: string;
  sku?: string;
  weight?: 2;
  dimensions?: object;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: [];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: object;
  images?: [];
  status?: string;
  products?: [];
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
