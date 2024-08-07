import DefaultButton from "@src/ui/Buttons/DefaultButton";
import discountedPricePurchase from "./discountedPricePurchase.module.css";

export default function DiscountedPricePurchase() {
  return (
    <div className={discountedPricePurchase.price_wrapper}>
      <div className={discountedPricePurchase.price_container}>
        <div className={discountedPricePurchase.price_wrapper}>
          <div className={discountedPricePurchase.price_column}>
            <p className={discountedPricePurchase.newprice}>$7.17</p>
            <p className={discountedPricePurchase.oldprice}>$9.99</p>
          </div>
          <hr />
          <p className={discountedPricePurchase.discount}>
            Your discount:
            <span className={discountedPricePurchase.discount_number}>
              14.5%
            </span>
          </p>
        </div>
        <DefaultButton>Add to cart</DefaultButton>
      </div>
    </div>
  );
}
