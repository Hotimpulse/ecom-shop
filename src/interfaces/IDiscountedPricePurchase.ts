import { IProduct } from "./IProducts";

export interface IDiscountedPricePurchase {
  newprice: string;
  oldprice: string;
  inCartCheck: boolean;
  itemCount: number;
  product: IProduct;
  discountedTotal: number;
}
