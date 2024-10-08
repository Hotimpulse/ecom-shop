import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, IProductsData } from "@src/interfaces/IProducts";
import { RootState } from "../store";
import getAuthToken from "@src/util/getAuthToken";

const initialState: IProducts = {
  products: {
    products: [],
    skip: 0,
    limit: 12,
    total: 0,
  },
  status: "", // 'loading', 'error', 'ready', 'unauthorized'
  input: "",
  append: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { input, append }: { input: string; append: boolean },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { limit, skip } = state.products.products;

    const token = getAuthToken();

    const response = await fetch(
      `https://dummyjson.com/auth/products/search?q=${input}&limit=${limit}&skip=${
        append ? skip : 0
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      localStorage.removeItem("token");
      return rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: IProductsData = await response.json();
    return { data, append };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, append } = action.payload;
        state.products = {
          ...state.products,
          products: append
            ? [...state.products.products, ...data.products]
            : data.products,
          skip: append
            ? state.products.skip + data.products.length
            : data.products.length,
          total: data.total,
        };
        state.status = "ready";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          state.status = "unauthorized";
        } else {
          state.status = "error";
        }
      });
  },
});

export const { setInput } = productsSlice.actions;
export default productsSlice.reducer;
