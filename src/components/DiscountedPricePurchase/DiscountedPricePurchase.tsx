import DefaultButton from "@src/ui/Buttons/DefaultButton";
import discountedPricePurchase from "./discountedPricePurchase.module.scss";

export default function DiscountedPricePurchase({
  newprice,
  oldprice,
  discount,
}) {
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
        <DefaultButton>Add to cart</DefaultButton>
      </div>
    </div>
  );
}
