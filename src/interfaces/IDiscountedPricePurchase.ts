export interface IDiscountedPricePurchase {
  newprice: string;
  oldprice: string;
  discount: number;
  inCartCheck: boolean;
  itemCount: number;
  id?: number;
  title?: string;
  price?: number;
  quantity?: number;
  total?: number;
  discountPercentage?: number;
  discountedTotal?: number;
  thumbnail?: string;
  totalStock: number;
}
