import * as React from "react";
import { Balance } from "./Balance";
import { render, screen } from "@testing-library/react";
import { GlobalContext } from "../../context/GlobalState";

describe("balance component", () => {
  test("without context values", () => {
    render(<Balance />);
    expect(screen.getByTestId("balance-heading")).toHaveTextContent(
      "Your Balance"
    );
    expect(screen.getByTestId("balance-amount").textContent).toContain("0.00");
  });

  test("with context", () => {
    const transactions = [
      {
        id: "123456",
        text: "grocery",
        amount: 500,
      },
    ];
    const wrapper = ({ children }) => (
      <GlobalContext.Provider value={{ transactions }}>
        {children}
      </GlobalContext.Provider>
    );
    render(<Balance />, { wrapper });
    expect(screen.getByTestId("balance-heading")).toHaveTextContent(
      "Your Balance"
    );
    expect(screen.getByTestId("balance-amount").textContent).toContain("500");
  });
});
