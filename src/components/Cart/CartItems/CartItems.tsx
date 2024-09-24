import { ICartItems } from "@src/interfaces/ICartItems";
import cart from "./cartItems.module.scss";
import { useNavigate } from "react-router-dom";

export default function CartItems({ children, image }: ICartItems) {
  const navigate = useNavigate();

  function handleItemClick(): void {
    navigate("/product/1");
  }

  return (
    <div className={cart.cart_item}>
      <div className={cart.cart_item_wrapper}>
        <div className={cart.cart_left_container}>
          {image}
          <div className={cart.cart_item_text}>
            <h3 className={cart.cart_item_heading} onClick={handleItemClick}>
              Essence Mascara Lash Princess
            </h3>
            <span className={cart.cart_item_price}>$110</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
