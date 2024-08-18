import product_styles from "./product.module.scss";
import Gallery from "@src/components/Gallery/Gallery";
import DiscountedPricePurchase from "@src/components/DiscountedPricePurchase/DiscountedPricePurchase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductInfo } from "@src/store/product/productSlice";
import Spinner from "@src/ui/Spinner/Spinner";
import StarCount from "@src/components/Product/StarCount";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((store: RootState) => store.product);
  const product = useSelector((store: RootState) => store.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductInfo(Number(id)));
    }
  }, [id, dispatch]);

  const priceAfterDiscount = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className={product_styles.product_wrapper}>
      <div className={product_styles.product_container}>
        {status === "loading" && <Spinner />}
        {status === "ready" && (
          <>
            <Gallery image={product.thumbnail} imageArr={product.images} />
            <div className={product_styles.product_info_wrapper}>
              <h2 className={product_styles.product_info_title}>
                {product.title}
              </h2>
              <div className={product_styles.product_info_stats_wrapper}>
                <span className={product_styles.product_info_ratings}>
                  {product.rating && Math.round(product.rating)}
                  <StarCount
                    productRating={product.rating && Math.round(product.rating)}
                  />
                </span>
                <span className={product_styles.product_info_categories}>
                  {product.category}
                </span>
              </div>
              <div className={product_styles.product_info_stock_wrapper}>
                <hr />
                <p className={product_styles.product_info_stock}>
                  {product.availabilityStatus} - Only {product.stock} left!
                </p>
                <hr />
              </div>
              <p className={product_styles.product_info_description}>
                {product.description}
              </p>
              <div className={product_styles.product_info_subtitles}>
                <span className={product_styles.product_info_warranty}>
                  {product.warrantyInformation}
                </span>
                <span className={product_styles.product_info_shipping}>
                  {product.shippingInformation}
                </span>
              </div>
              <DiscountedPricePurchase
                newprice={`${`$`}` + priceAfterDiscount}
                oldprice={`${`$`}` + product.price}
                discount={product.discountPercentage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
