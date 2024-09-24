import cart from "./cartItems.module.scss";
import { useNavigate } from "react-router-dom";
import { ICartItem } from "@src/interfaces/IUserCarts";

export default function CartItems({
  id,
  price,
  title,
  thumbnail,
  children,
}: ICartItem) {
  const navigate = useNavigate();

  function handleItemClick(): void {
    navigate(`/product/${id}`);
  }

  return (
    <div className={cart.cart_item}>
      <div className={cart.cart_item_wrapper}>
        <div className={cart.cart_left_container}>
          <picture>
            <source srcSet={thumbnail} type="image/png" />
            <img
              className={cart.cart_item_pic}
              src={thumbnail}
              alt={`picture of ${title}`}
              loading="lazy"
            />
          </picture>
          <div className={cart.cart_item_text}>
            <h3 className={cart.cart_item_heading} onClick={handleItemClick}>
              {title}
            </h3>
            <span className={cart.cart_item_price}>${price}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
