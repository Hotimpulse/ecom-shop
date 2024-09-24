import cart from "./cart.module.scss";
import CartInfo from "@src/components/Cart/CartInfo/CartInfo";
import CartItems from "@src/components/Cart/CartItems/CartItems";
import PlusMinusItem from "@src/components/Cart/PlusMinusItem/PlusMinusItem";
import cartItems from "../../components/Cart/CartItems/cartItems.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import Skeleton from "react-loading-skeleton";
import { ICartItem } from "@src/interfaces/IUserCarts";
import { fetchProductInfo } from "@src/store/product/productSlice";
import { useEffect, useState } from "react";
import { IProduct } from "@src/interfaces/IProducts";
import { addItem, deleteItem } from "@src/store/cart/cartSlice";
import AddToCart from "@src/components/ItemCard/AddToCart";
import toast from "react-hot-toast";

export default function Cart() {
  const { carts, status } = useSelector((store: RootState) => store.carts);

  const dispatch = useDispatch<AppDispatch>();
  const [stockInfo, setStockInfo] = useState<{ [key: number]: number }>({});

  const [deletedItems, setDeletedItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const fetchStock = async (id: number) => {
      try {
        const result: IProduct = await dispatch(fetchProductInfo(id)).unwrap();
        setStockInfo((prevStockInfo) => ({
          ...prevStockInfo,
          [id]: result.stock,
        }));
      } catch (error) {
        toast.error("Failed to fetch product info");
        console.error("Failed to fetch product info", error);
      }
    };

    if (status === "ready" && carts[0].products) {
      carts[0].products.forEach((item) => {
        fetchStock(item.id);
      });
    }
  }, [status, carts, dispatch]);

  function handleDeleteItem(item: ICartItem): void {
    setDeletedItems((prevItem) => [...prevItem, item]);
    dispatch(deleteItem(item.id));
  }

  function handleRestoreItem(item: ICartItem): void {
    const restoredCartItem = { ...item, quantity: 1 };
    dispatch(addItem(restoredCartItem));
    setDeletedItems((prevDeletedItems) =>
      prevDeletedItems.filter((deletedItem) => deletedItem.id !== item.id)
    );
  }

  return (
    <div className={cart.cart_wrapper}>
      <h1 className={cart.cart_header}>My cart</h1>
      {carts[0] !== undefined && (
        <div className={cart.cart_main_container}>
          <div
            className={
              carts[0].products.length === 0
                ? cart.cart_items_empty
                : cart.cart_items_container
            }
          >
            <div className={cart.cart_contents}>
              {status === "loading" && (
                <Skeleton
                  style={{
                    backgroundColor: "#484283",
                  }}
                  width={400}
                  height={100}
                  count={carts[0].products.length}
                />
              )}
              {status === "ready" &&
                carts[0]?.products.map((item: ICartItem, index: number) => {
                  const totalStock = stockInfo[item.id] || 0;

                  return (
                    <CartItems
                      key={index}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      id={item.id}
                      quantity={item.quantity}
                      discountPercentage={item.discountPercentage}
                      total={item.total}
                      discountedTotal={item.discountedTotal}
                      price={
                        +(
                          item.quantity *
                          (item.price -
                            (item.price * item.discountPercentage) / 100)
                        ).toFixed(2) || item.price
                      }
                    >
                      <div className={cartItems.cart_right_container}>
                        <div className={cartItems.cart_btn_container}>
                          <PlusMinusItem
                            count={item.quantity}
                            id={item.id}
                            totalStock={totalStock}
                            handleDeleteItem={() => handleDeleteItem(item)}
                          />
                        </div>
                        <a
                          className={cartItems.cart_item_del_text}
                          onClick={() => handleDeleteItem(item)}
                        >
                          Delete
                        </a>
                      </div>
                    </CartItems>
                  );
                })}
              {deletedItems.length > 0 && (
                <div className={cart.cart_deleted_items}>
                  {deletedItems.map((item: ICartItem) => (
                    <CartItems
                      key={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      id={item.id}
                      quantity={item.quantity}
                      discountPercentage={item.discountPercentage}
                      total={item.total}
                      discountedTotal={item.discountedTotal}
                      price={item.price}
                      isDeleted={true}
                    >
                      <div className={cartItems.cart_btn_container}>
                        <AddToCart
                          handleAddToCart={() => handleRestoreItem(item)}
                        />
                      </div>
                    </CartItems>
                  ))}
                </div>
              )}
            </div>
          </div>
          {status === "loading" && (
            <Skeleton width={240} height={50} count={3} />
          )}
          {status === "ready" && carts[0].products.length !== 0 && (
            <CartInfo
              totalCount={carts[0]?.totalQuantity}
              totalPriceNoDiscount={parseFloat(carts[0]?.total.toFixed(2))}
              totalDiscountPrice={parseFloat(
                carts[0]?.discountedTotal.toFixed(2)
              )}
            />
          )}
        </div>
      )}

      {((status === "ready" && carts[0] === undefined) ||
        status === "error" ||
        (status === "ready" && carts[0].products.length === 0)) && (
        <div className={cart.cart_main_container}>
          <p className={cart.cart_no_items_text}>No items</p>
        </div>
      )}
    </div>
  );
}
