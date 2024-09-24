import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart, ICartsData } from "@src/interfaces/IUserCarts";
import getAuthToken from "@src/util/getAuthToken";
import { WritableDraft } from "immer";

const initialState: ICartsData = {
  carts: [
    {
      id: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 0,
      totalProducts: 0,
      totalQuantity: 0,
    },
  ],
  total: 0,
  skip: 0,
  limit: 0,
  status: "", // 'loading', 'error', 'ready'
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCarts",
  async (userid: number, { rejectWithValue }) => {
    const token = getAuthToken();

    const response = await fetch(
      `https://dummyjson.com/auth/carts/user/${userid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Unauthorized");
    }

    const data: ICartsData = await response.json();
    return data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    updatedCart: {
      cartId: number;
      products: { id: number; quantity: number }[];
    },
    { rejectWithValue }
  ) => {
    const token = getAuthToken();

    const response = await fetch(
      `https://dummyjson.com/auth/carts/${updatedCart.cartId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: false,
          products: updatedCart.products,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue("Unauthorized");
    }

    const data: ICart = await response.json();
    return data;
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.carts[0]?.products.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * (existingItem.price || 0);
        existingItem.discountedTotal =
          existingItem.total -
          (existingItem.total * (existingItem.discountPercentage || 0)) / 100;
      } else {
        const itemToAdd = {
          ...newItem,
          quantity: 1,
          total: newItem.price * 1,
          discountedTotal:
            newItem.price * 1 -
            (newItem.price * (newItem.discountPercentage || 0)) / 100,
        };
        state.carts[0].products.push(itemToAdd);
      }
      refreshCartState(state);
    },
    deleteItem(state, action) {
      if (state.carts.length > 0) {
        state.carts[0].products = state.carts[0].products.filter(
          (item) => item.id !== action.payload
        );
        refreshCartState(state);
      }
    },
    increaseQuantity(state, action) {
      const item = state.carts[0].products.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
        item.total = item.quantity * (item.price || 0);
        item.discountedTotal =
          item.total - (item.total * (item.discountPercentage || 0)) / 100;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.carts[0].products.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        item.total = item.quantity * (item.price || 0);
        item.discountedTotal =
          item.total - (item.total * (item.discountPercentage || 0)) / 100;
      }
    },
    clearCart(state) {
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.carts = action.payload.carts;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        state.status = "ready";
        refreshCartState(state);
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "error";
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.carts[0] = action.payload;
        state.status = "ready";
        refreshCartState(state);
      })
      .addCase(updateCart.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          state.status = "unauthorized";
        } else {
          state.status = "error";
        }
      });
  },
});

function refreshCartState(state: WritableDraft<ICartsData>) {
  if (state.carts.length > 0) {
    const cart = state.carts[0];
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    cart.totalProducts = cart.products.length;
    cart.total = cart.products.reduce((acc, item) => acc + item.total, 0);
    cart.discountedTotal = cart.products.reduce((acc, item) => {
      const discountPercentage = item.discountPercentage || 0;
      const price = item.price || 0;
      const discountedPrice = price - (price * discountPercentage) / 100;
      return acc + discountedPrice * item.quantity;
    }, 0);
  }
}

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartsSlice.actions;

export default cartsSlice.reducer;
