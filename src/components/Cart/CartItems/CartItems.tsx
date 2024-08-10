import cart from "./cartItems.module.scss";
import { useNavigate } from "react-router-dom";
import PlusMinusItem from "../PlusMinusItem/PlusMinusItem";

export default function CartItems() {
  const navigate = useNavigate();

  function handleItemClick(): void {
    navigate("/product/1");
  }

  return (
    <div className={cart.cart_item}>
      <div className={cart.cart_item_wrapper}>
        <div className={cart.cart_left_container}>
          <img
            className={cart.cart_item_pic}
            src="./src/assets/pics/gallery_hoe_pic.png"
            alt="picture of the item"
          />
          <div className={cart.cart_item_text}>
            <h3 className={cart.cart_item_heading} onClick={handleItemClick}>
              Essence Mascara Lash Princess
            </h3>
            <span className={cart.cart_item_price}>$110</span>
          </div>
        </div>
        <div className={cart.cart_right_container}>
          <div className={cart.cart_btn_container}>
            <PlusMinusItem />
          </div>
          <span className={cart.cart_item_del_text}>Delete</span>
        </div>
      </div>
    </div>
  );
}
