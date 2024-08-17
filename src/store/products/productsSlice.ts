import { IProducts, IProductsData } from "@src/interfaces/IProducts";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from "../store";

const initialState: IProducts = {
  products: {
    products: [],
    skip: 0,
    limit: 12,
    total: 0,
  },
  status: "loading",
  input: "",
  append: false,
};

type ProductsAction =
  | { type: "dataReceived"; payload: IProductsData; append: boolean }
  | { type: "dataFailed"; payload: object }
  | { type: "dataLoading"; payload: object };

const productsReducer = (
  state: IProducts = initialState,
  action: ProductsAction
): IProducts => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        products: {
          ...state.products,
          products: action.append
            ? [...state.products.products, ...action.payload.products]
            : action.payload.products,
          skip: action.append
            ? state.products.skip + action.payload.products.length
            : action.payload.products.length,
          total: action.payload.total,
        },
        status: "ready",
      };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export function getData(input: string, append: boolean): ThunkAction<void, RootState, unknown, AnyAction> {
    return async (dispatch, getState) => {
      const state = getState();
      const { limit, skip } = state.products.products;
  
      dispatch({ type: "dataLoading" });
  
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${input}&limit=${limit}&skip=${append ? skip : 0}`
        );
  
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
  
        const data: IProductsData = await res.json();
        dispatch({ type: "dataReceived", payload: data, append });
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
      }
    };
  }

export default productsReducer;
