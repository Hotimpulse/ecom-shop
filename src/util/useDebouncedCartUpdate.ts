import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import {
  increaseQuantity,
  decreaseQuantity,
  updateCart,
} from "@src/store/cart/cartSlice";
import { ICart } from "@src/interfaces/IUserCarts";

export const useDebouncedCartUpdate = (productId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.carts);

  const [isUpdating, setIsUpdating] = useState(false);
  const [localQuantity, setLocalQuantity] = useState<number | null>(null);

  useEffect(() => {
    if (localQuantity === null) return;

    const timeoutId = setTimeout(() => {
      const updatedCart: ICart = carts[0];
      dispatch(
        updateCart({
          cartId: updatedCart.id,
          products: updatedCart.products.map(({ id, quantity }) => ({
            id,
            quantity,
          })),
        })
      );
      setIsUpdating(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localQuantity, dispatch, carts]);

  const handleIncreaseQuantity = () => {
    setIsUpdating(true);
    dispatch(increaseQuantity(productId));
    const updatedQuantity =
      carts[0].products.find((item) => item.id === productId)?.quantity || 0;
    setLocalQuantity(updatedQuantity);
  };

  const handleDecreaseQuantity = () => {
    setIsUpdating(true);
    dispatch(decreaseQuantity(productId));
    const updatedQuantity =
      carts[0].products.find((item) => item.id === productId)?.quantity || 0;
    setLocalQuantity(updatedQuantity);
  };

  return { handleIncreaseQuantity, handleDecreaseQuantity, isUpdating };
};
