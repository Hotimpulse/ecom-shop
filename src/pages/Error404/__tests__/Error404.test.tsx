import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Error404 from "../Error404";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Error404 Component", () => {
  it("renders Error404 and navigates to the main page on button click", () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Back to main/i });
    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });
});
