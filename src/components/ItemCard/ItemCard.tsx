import { useNavigate } from "react-router-dom";
import itemCard from "./itemCard.module.scss";
import { IItemCard } from "@src/interfaces/IItemCard";
import { RootState } from "@src/store/store";
import { useSelector } from "react-redux";
import PlusMinusItem from "../Cart/PlusMinusItem/PlusMinusItem";
import { ICartItem } from "@src/interfaces/IUserCarts";

export default function ItemCard({ id, title, price, thumbnail }: IItemCard) {
  const navigate = useNavigate();

  function handleCardClick(): void {
    navigate(`/product/${id}`);
  }

  const { carts } = useSelector((store: RootState) => store.carts);

  const cartProduct = carts.carts[0]?.products.find(
    (product: ICartItem) => product.id === id
  );

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
            <PlusMinusItem count={cartProduct.quantity} />
          </div>
        ) : (
          <button className={itemCard.card_btn} aria-label="add to cart button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7.14286H16.6038L13.0359 0.34668C12.8589 0.00908289 12.475 -0.101141 12.1784 0.10185C11.8823 0.304841 11.7865 0.743572 11.9641 1.08189L15.1461 7.14286H4.85388L8.03587 1.08184C8.21348 0.743524 8.11767 0.304793 7.82164 0.101802C7.5244 -0.101189 7.14173 0.00903482 6.96411 0.346631L3.39617 7.14281H0V8.57139H1.35651L2.94432 18.2512C3.11033 19.2648 3.88547 20 4.78761 20H15.2124C16.1145 20 16.8896 19.2648 17.055 18.252L18.6434 8.57139H20C20 8.57139 20 7.14286 20 7.14286V7.14286ZM15.8264 17.989C15.7715 18.3266 15.5133 18.5715 15.2124 18.5715H4.78761C4.4867 18.5715 4.22854 18.3266 4.173 17.9883L2.62789 8.57139H17.3721L15.8264 17.989V17.989Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
