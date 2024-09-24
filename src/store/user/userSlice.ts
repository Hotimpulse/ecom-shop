import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAuthToken from "@src/util/getAuthToken";

export interface IUser {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface IUserState {
  status: string;
  user: IUser;
}

const initialState: IUserState = {
  status: "", // 'loading', 'error', 'ready'
  user: {
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
    refreshToken: "",
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) throw new Error("Failed to login!");

    const data: IUser = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    const token = getAuthToken();

    if (!token) {
      return rejectWithValue("No token available! Please login.");
    }

    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401 || !response.ok) {
      localStorage.removeItem("token");
      return rejectWithValue("Unauthorized! Please login again.");
    }

    const data: IUser = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "ready";
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "ready";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          state.status = "unauthorized";
        } else {
          state.status = "error";
        }
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
