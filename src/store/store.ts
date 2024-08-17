import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import cartsReducer from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
