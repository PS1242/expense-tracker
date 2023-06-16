import * as React from "react";
import { screen, render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders correct heading", () => {
    render(<Header />);
    expect(screen.getByText("Expense tracker")).toBeInTheDocument();
  });
});
