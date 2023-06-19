import * as React from "react";
import { screen, render, within, cleanup } from "@testing-library/react";
import { TransactionList } from "./TransactionList";
import { GlobalContext } from "../../context/GlobalState";
import userEvent from "@testing-library/user-event";

describe("Transaction list component without data", () => {
  test("renders heading", () => {
    render(<TransactionList />);
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  test("there are no child elements", () => {
    render(<TransactionList />);
    const list = screen.getByTestId("transaction-list");
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });
});

describe("transaction list component with data", () => {
  afterEach(() => cleanup());

  const setup = () => {
    const transactions = [
      {
        id: "123",
        text: "salary",
        amount: 35000,
      },
      {
        id: "345",
        text: "incentive",
        amount: 5000,
      },
    ];
    const deleteTransaction = jest.fn();
    const wrapper = ({ children }) => (
      <GlobalContext.Provider value={{ transactions, deleteTransaction }}>
        {children}
      </GlobalContext.Provider>
    );

    render(<TransactionList />, { wrapper });

    const getTransactions = () =>
      screen.getAllByTestId("transaction-item").map((item) => ({
        id: item.id,
        text: item.textContent.split("+")[0],
        amount: within(item).getByTestId("transaction-amount").textContent,
      }));

    return { getTransactions, deleteTransaction };
  };

  test("renders with data", () => {
    const { getTransactions } = setup();
    expect(
      getTransactions().findIndex((entry) => entry.text === "salary")
    ).toBe(0);
    expect(
      getTransactions().findIndex((entry) => entry.text === "incentive")
    ).toBe(1);
  });

  test("deletes item from list", () => {
    const { deleteTransaction } = setup();
    const itemToDelete = {
      id: "345",
      text: "incentive",
      amount: 5000,
    };
    const deleteButton = screen
      .getAllByTestId("transaction-item")
      .filter((item) => item.id === itemToDelete.id)
      .map((item) => within(item).getByTestId("delete-btn"));

    expect(deleteButton.length).toBeGreaterThan(0);
    userEvent.click(deleteButton[0]);
    expect(deleteTransaction).toHaveBeenCalledWith(itemToDelete.id);
  });
});
