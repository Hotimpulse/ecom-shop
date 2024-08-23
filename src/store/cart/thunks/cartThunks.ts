import { updateCart } from "../cartSlice";
import { increaseQuantity, decreaseQuantity } from "../cartSlice";
import { AppThunk } from "../../store";

export const increaseQuantityThunk =
  (productId: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(increaseQuantity(productId));
    const { carts } = getState();
    const updatedCart = carts.carts.carts[0];
    dispatch(
      updateCart({
        cartId: updatedCart.id,
        products: updatedCart.products.map(
          ({ id, quantity }: { id: number; quantity: number }) => ({
            id,
            quantity,
          })
        ),
      })
    );
  };

export const decreaseQuantityThunk =
  (productId: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(decreaseQuantity(productId));
    const { carts } = getState();
    const updatedCart = carts.carts.carts[0];
    dispatch(
      updateCart({
        cartId: updatedCart.id,
        products: updatedCart.products.map(
          ({ id, quantity }: { id: number; quantity: number }) => ({
            id,
            quantity,
          })
        ),
      })
    );
  };
