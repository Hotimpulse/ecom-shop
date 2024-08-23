import DefaultButton from "@src/ui/Buttons/DefaultButton";
import discountedPricePurchase from "./discountedPricePurchase.module.scss";
import { IDiscountedPricePurchase } from "@src/interfaces/IDiscountedPricePurchase";
import PlusMinusItem from "../Cart/PlusMinusItem/PlusMinusItem";
import { useDispatch } from "react-redux";
import { addItem } from "@src/store/cart/cartSlice";

export default function DiscountedPricePurchase({
  newprice,
  oldprice,
  inCartCheck,
  itemCount,
  discountedTotal,
  product,
}: IDiscountedPricePurchase) {
  const dispatch = useDispatch();

  function handleAddToCart(): void {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: itemCount,
      total: product.stock,
      discountPercentage: product.discountPercentage,
      discountedTotal: discountedTotal,
      thumbnail: product.thumbnail,
    };
    dispatch(addItem(newItem));
  }

  return (
    <div className={discountedPricePurchase.price_wrapper}>
      <div className={discountedPricePurchase.price_container}>
        <div className={discountedPricePurchase.price_wrapper}>
          <div className={discountedPricePurchase.price_column}>
            <p className={discountedPricePurchase.newprice}>{newprice}</p>
            <p className={discountedPricePurchase.oldprice}>{oldprice}</p>
          </div>
          <hr />
          <p className={discountedPricePurchase.discount}>
            {`Your discount:`}
            <span className={discountedPricePurchase.discount_number}>
              {product.discountPercentage}%
            </span>
          </p>
        </div>
        {inCartCheck ? (
          <PlusMinusItem
            count={itemCount}
            id={product.id || 0}
            totalStock={product.stock}
          />
        ) : (
          <DefaultButton
            onClick={handleAddToCart}
            type={"button"}
            disabled={false}
            ariaLabel={"Add to cart button"}
          >
            Add to cart
          </DefaultButton>
        )}
      </div>
    </div>
  );
}
