import cart from "./cart.module.scss";
import CartInfo from "@src/components/Cart/CartInfo/CartInfo";
import CartItems from "@src/components/Cart/CartItems/CartItems";
import PlusMinusItem from "@src/components/Cart/PlusMinusItem/PlusMinusItem";
import cartItems from "../../components/Cart/CartItems/cartItems.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import Spinner from "@src/ui/Spinner/Spinner";
import { ICartItem } from "@src/interfaces/IUserCarts";
import { fetchProductInfo } from "@src/store/product/productSlice";
import { useEffect, useState } from "react";
import { IProduct } from "@src/interfaces/IProducts";

export default function Cart() {
  const { carts, status } = useSelector((store: RootState) => store.carts);
  const dispatch = useDispatch<AppDispatch>();
  const [stockInfo, setStockInfo] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchStock = async (id: number) => {
      try {
        const result: IProduct = await dispatch(fetchProductInfo(id)).unwrap();
        setStockInfo((prevStockInfo) => ({
          ...prevStockInfo,
          [id]: result.stock,
        }));
      } catch (error) {
        console.error("Failed to fetch product info", error);
      }
    };

    if (status === "ready" && carts.carts[0]?.products) {
      carts.carts[0].products.forEach((item) => {
        fetchStock(item.id);
      });
    }
  }, [status, carts.carts, dispatch]);

  return (
    <div className={cart.cart_wrapper}>
      <h1 className={cart.cart_header}>My cart</h1>
      {status === "loading" && <Spinner />}
      {status === "ready" && carts.carts[0] !== undefined ? (
        <div className={cart.cart_main_container}>
          <div className={cart.cart_items_container}>
            <div className={cart.cart_contents}>
              {carts?.carts[0]?.products.map(
                (item: ICartItem, index: number) => {
                  const totalStock = stockInfo[item.id] || 0;

                  return (
                    <CartItems
                      key={index}
                      price={Number(
                        (
                          item.price -
                          (item.price * (item.discountPercentage ?? 0)) / 100
                        ).toFixed(2)
                      )}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      id={item.id}
                      quantity={item.quantity}
                      discountPercentage={item.discountPercentage}
                      total={item.total}
                      discountedTotal={item.discountedTotal}
                    >
                      <div className={cartItems.cart_right_container}>
                        <div className={cartItems.cart_btn_container}>
                          <PlusMinusItem
                            count={item.quantity}
                            id={item.id}
                            totalStock={totalStock}
                          />
                        </div>
                        <span className={cartItems.cart_item_del_text}>
                          Delete
                        </span>
                      </div>
                    </CartItems>
                  );
                }
              )}
            </div>
          </div>
          <CartInfo
            totalCount={carts.carts[0].totalQuantity}
            totalPriceNoDiscount={+carts.carts[0].total.toFixed(2)}
            totalDiscountPrice={+carts.carts[0].discountedTotal.toFixed(2)}
          />
        </div>
      ) : (
        <div className={cart.cart_main_container}>
          <p className={cart.cart_no_items_text}>No items</p>
        </div>
      )}
    </div>
  );
}
