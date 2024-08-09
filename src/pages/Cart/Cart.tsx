import cart from "./cart.module.scss";
import CartInfo from "@src/components/Cart/CartInfo/CartInfo";
import CartItems from "@src/components/Cart/CartItems/CartItems";

export default function Cart() {
  return (
    <div className={cart.cart_wrapper}>
      <h1 className={cart.cart_header}>My cart</h1>

      <div className={cart.cart_main_container}>
        <div className={cart.cart_items_container}>
          <div className={cart.cart_content_box}>
            <div className={cart.cart_contents}>
              <CartItems />
              <CartItems />
              <CartItems />
              <CartItems />
            </div>
          </div>
        </div>
        <CartInfo />
      </div>
    </div>
  );
}
