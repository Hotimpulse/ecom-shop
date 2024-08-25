import { configureStore } from "@reduxjs/toolkit";
import { describe, it, vi, expect, beforeEach } from "vitest";
import userReducer, { fetchUserInfo, loginUser } from "../userSlice";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockGetAuthToken = vi.fn();
vi.mock("@src/util/__mocks__/getAuthToken", () => ({
  getAuthToken: mockGetAuthToken,
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

type AppStore = ReturnType<typeof createTestStore>;
type AppState = ReturnType<AppStore["getState"]>;

describe("userSlice async actions", () => {
  let store: AppStore;

  beforeEach(() => {
    store = createTestStore();
    mockFetch.mockReset();
    mockGetAuthToken.mockReset();
  });

  it("handles login failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const action = await store.dispatch(
      loginUser({ username: "oliviaw", password: "oliviawpass123" })
    );

    const state = store.getState() as AppState;

    expect(action.type).toBe("user/loginUser/rejected");
    expect(state.user.user.token).toBe("");
    expect(state.user.status).toBe("error");
  });

  it("handles unauthorized error during fetchUserInfo", async () => {
    mockGetAuthToken.mockReturnValue("invalidToken");

    mockFetch.mockResolvedValueOnce({
      status: 401,
    });

    const action = await store.dispatch(fetchUserInfo());

    const state = store.getState() as AppState;

    expect(action.type).toBe("user/fetchUserInfo/rejected");
    expect(state.user.user.token).toBe("");
    expect(state.user.status).toBe("error");
  });
});
