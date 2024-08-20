import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import cartsReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
    product: productReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
