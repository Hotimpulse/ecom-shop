import { updateCart } from "../cartSlice";
import { increaseQuantity, decreaseQuantity } from "../cartSlice";
import { AppThunk } from "../../store";
import { ICart } from "@src/interfaces/IUserCarts";

export const increaseQuantityThunk =
  (productId: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(increaseQuantity(productId));

    const { carts } = getState();
    const cartItem = carts.carts[0].products.find(
      (item) => item.id === productId
    );
    const updatedCart: ICart = carts.carts[0];

    try {
      if (cartItem) {
        dispatch(
          updateCart({
            cartId: updatedCart.id,
            products: updatedCart.products.map(({ id, quantity }) => ({
              id,
              quantity,
            })),
          })
        ).unwrap();
      }
    } catch (error) {
      dispatch(decreaseQuantity(productId));
    }
  };

export const decreaseQuantityThunk =
  (productId: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(decreaseQuantity(productId));

    const { carts } = getState();
    const cartItem = carts.carts[0].products.find(
      (item) => item.id === productId
    );
    const updatedCart = carts.carts[0];

    try {
      if (cartItem) {
        dispatch(
          updateCart({
            cartId: updatedCart.id,
            products: updatedCart.products.map(({ id, quantity }) => ({
              id,
              quantity,
            })),
          })
        ).unwrap();
      }
    } catch (error) {
      dispatch(increaseQuantity(productId));
    }
  };
