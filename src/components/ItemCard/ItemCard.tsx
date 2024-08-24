import { useNavigate } from "react-router-dom";
import itemCard from "./itemCard.module.scss";
import { IItemCard } from "@src/interfaces/IItemCard";
import { AppDispatch, RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import PlusMinusItem from "../Cart/PlusMinusItem/PlusMinusItem";
import { ICartItem } from "@src/interfaces/IUserCarts";
import { addItem } from "@src/store/cart/cartSlice";
import AddToCart from "./AddToCart";

export default function ItemCard({
  id,
  title,
  price,
  thumbnail,
  totalStock,
}: IItemCard) {
  const navigate = useNavigate();

  function handleCardClick(): void {
    navigate(`/product/${id}`);
  }

  const { carts } = useSelector((store: RootState) => store.carts);
  const dispatch = useDispatch<AppDispatch>();

  const cartProduct = carts[0]?.products.find(
    (product: ICartItem) => product.id === id
  );

  function handleAddToCart() {
    dispatch(addItem({ id, title, price, thumbnail, quantity: 1 }));
  }

  return (
    <div className={itemCard.card_item}>
      <div className={itemCard.card_img_container} onClick={handleCardClick}>
        <picture>
          <source
            srcSet={thumbnail}
            type="image/png"
            media="(orientation: portrait)"
            sizes="(max-width: 320px) 256px"
          />
          <img
            loading="lazy"
            src={thumbnail}
            alt={
              title !== undefined
                ? "image of " + title
                : "no such product available"
            }
            className={itemCard.card_img}
          />
        </picture>
        <div className={itemCard.card_text_overlay}>Show details</div>
      </div>
      <div className={itemCard.card_bottom_part}>
        <div className={itemCard.card_info}>
          <div
            className={itemCard.card_title_overflow}
            onClick={handleCardClick}
          >
            {title}
          </div>
          <span className={itemCard.card_price}>${price}</span>
        </div>
        {cartProduct ? (
          <div className={itemCard.card_plusminus_btn}>
            <PlusMinusItem
              count={cartProduct.quantity}
              id={cartProduct.id}
              totalStock={totalStock}
            />
          </div>
        ) : (
          <AddToCart handleAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
  );
}
