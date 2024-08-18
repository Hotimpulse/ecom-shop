import cart from "./cart.module.scss";
import CartInfo from "@src/components/Cart/CartInfo/CartInfo";
import CartItems from "@src/components/Cart/CartItems/CartItems";
import PlusMinusItem from "@src/components/Cart/PlusMinusItem/PlusMinusItem";
import cartItems from "../../components/Cart/CartItems/cartItems.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import Spinner from "@src/ui/Spinner/Spinner";
import { ICartItem } from "@src/interfaces/IUserCarts";

export default function Cart() {
  const { carts, status } = useSelector((store: RootState) => store.carts);

  return (
    <div className={cart.cart_wrapper}>
      <h1 className={cart.cart_header}>My cart</h1>
      {status === "loading" && <Spinner />}
      {status === "ready" && carts.carts[0] !== undefined ? (
        <div className={cart.cart_main_container}>
          <div className={cart.cart_items_container}>
            <div className={cart.cart_contents}>
              {carts.carts[0].products.map((item: ICartItem, index: number) => {
                return (
                  <CartItems
                    key={index}
                    price={Number(
                      (item.discountedTotal / item.quantity).toFixed(2)
                    )}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    id={item.id}
                  >
                    <div className={cartItems.cart_right_container}>
                      <div className={cartItems.cart_btn_container}>
                        <PlusMinusItem count={item.quantity} />
                      </div>
                      <span className={cartItems.cart_item_del_text}>
                        Delete
                      </span>
                    </div>
                  </CartItems>
                );
              })}
            </div>
          </div>
          <CartInfo
            totalCount={carts.carts[0].totalProducts}
            totalPriceNoDiscount={carts.carts[0].total}
            totalDiscountPrice={carts.carts[0].discountedTotal}
          />
        </div>
      ) : (
        <div className={cart.cart_main_container}>
          <p className={cart.cart_no_items_text}>No items</p>
        </div>
      )}
    </div>
  );
}
