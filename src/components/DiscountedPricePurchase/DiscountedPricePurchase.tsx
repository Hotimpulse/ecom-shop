import DefaultButton from "@src/ui/Buttons/DefaultButton";
import discountedPricePurchase from "./discountedPricePurchase.module.scss";
import { IDiscountedPricePurchase } from "@src/interfaces/IDiscountedPricePurchase";
import PlusMinusItem from "../Cart/PlusMinusItem/PlusMinusItem";

export default function DiscountedPricePurchase({
  newprice,
  oldprice,
  discount,
  inCartCheck,
  itemCount,
}: IDiscountedPricePurchase) {
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
              {discount}%
            </span>
          </p>
        </div>
        {inCartCheck ? (
          <PlusMinusItem count={itemCount} />
        ) : (
          <DefaultButton>Add to cart</DefaultButton>
        )}
      </div>
    </div>
  );
}
