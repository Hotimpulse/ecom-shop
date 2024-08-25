import getAuthToken from "../getAuthToken";
import { describe, it } from "vitest";
import { expect } from "vitest";

interface LocalStorageMock {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
  removeItem: (key: string) => void;
}

const localStorageMock: LocalStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    clear: (): void => {
      store = {};
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("getAuthToken Function", () => {
  it("returns the token from localStorage", () => {
    localStorage.setItem("token", "test-token");

    const token = getAuthToken();
    expect(token).toBe("test-token");
  });

  it("returns null when there is no token", () => {
    localStorage.clear();

    const token = getAuthToken();
    expect(token).toBeNull();
  });
});
