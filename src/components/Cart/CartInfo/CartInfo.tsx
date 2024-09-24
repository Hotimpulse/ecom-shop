import cart from "./cartInfo.module.scss";

export default function CartInfo() {
  return (
    <div className={cart.cart_info}>
      <div className={cart.cart_pricing_wrap}>
        <div className={cart.cart_count_wrap}>
          <p className={cart.cart_count_text}>Total count</p>
          <p className={cart.cart_count_items}>3 items</p>
        </div>
        <div className={cart.cart_discount_wrap}>
          <p className={cart.cart_discount_text}>Price without discount</p>
          <p className={cart.cart_discount_price}>$700</p>
        </div>
      </div>

      <div className={cart.cart_price_wrap}>
        <p className={cart.cart_total_text}>Total price</p>
        <p className={cart.cart_total_price}>$590</p>
      </div>
    </div>
  );
}
