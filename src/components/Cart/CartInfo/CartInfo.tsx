import cart from "./cartInfo.module.scss";

interface ICartInfo {
  totalCount: number;
  totalPriceNoDiscount: number;
  totalDiscountPrice: number;
}

export default function CartInfo({
  totalCount,
  totalPriceNoDiscount,
  totalDiscountPrice,
}: ICartInfo) {
  return (
    <div className={cart.cart_info}>
      <div className={cart.cart_pricing_wrap}>
        <div className={cart.cart_count_wrap}>
          <p className={cart.cart_count_text}>Total count</p>
          <p className={cart.cart_count_items}>{totalCount} items</p>
        </div>
        <div className={cart.cart_discount_wrap}>
          <p className={cart.cart_discount_text}>Price without discount</p>
          <p className={cart.cart_discount_price}>${totalPriceNoDiscount}</p>
        </div>
      </div>

      <div className={cart.cart_price_wrap}>
        <p className={cart.cart_total_text}>Total price</p>
        <p className={cart.cart_total_price}>${totalDiscountPrice}</p>
      </div>
    </div>
  );
}
