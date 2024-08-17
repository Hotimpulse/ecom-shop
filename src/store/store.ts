import { applyMiddleware, combineReducers, createStore } from "redux";
import productsReducer from "./products/productsSlice";
import { thunk } from "redux-thunk";

const reducerState = combineReducers({
  products: productsReducer,
});

const store = createStore(reducerState, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
