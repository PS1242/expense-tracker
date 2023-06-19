import * as React from "react";
import { screen, render } from "@testing-library/react";
import { IncomeExpenses } from "./IncomeExpenses";
import { GlobalContext } from "../../context/GlobalState";

describe("Income and expenses component", () => {
  const transactions = [
    {
      id: "123",
      text: "income",
      amount: 35000,
    },
    {
      id: "345",
      text: "grocery",
      amount: -500,
    },
  ];
  const wrapper = ({ children }) => (
    <GlobalContext.Provider value={{ transactions }}>
      {children}
    </GlobalContext.Provider>
  );
  test("renders correctly", () => {
    render(<IncomeExpenses />, { wrapper });
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Expense")).toBeInTheDocument();
    expect(screen.getByTestId("incomes")).toHaveTextContent("$35000");
    expect(screen.getByTestId("expenses")).toHaveTextContent("-$500");
  });
});
