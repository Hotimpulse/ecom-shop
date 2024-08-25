import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "@src/components/Hero/Hero";

describe("Hero Component", () => {
  it("renders the Hero component", () => {
    render(<Hero />);

    expect(
      screen.getByText(
        /Any products from famous brands with worldwide delivery/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /We sell smartphones, laptops, clothes, shoes and many other products at low prices/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Button for shopping/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Goods4you/i)).toBeInTheDocument();
  });
});
