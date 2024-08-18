import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import cartsReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
    product: productReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
