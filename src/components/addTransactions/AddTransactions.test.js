import * as React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { AddTransactions } from "./AddTransactions";
import userEvent from "@testing-library/user-event";
import { GlobalContext } from "../../context/GlobalState";

describe("renders component", () => {
  beforeEach(() => render(<AddTransactions />));
  afterEach(() => cleanup());
  /**
   * Check if all the components are present
   */
  test("renders heading", () => {
    expect(screen.getByTestId("add-transaction-heading")).toBeInTheDocument();
  });
  test("renders text input", () => {
    expect(screen.getByLabelText("Text")).toBeInTheDocument();
  });
  test("renders amount input", () => {
    expect(screen.getByTestId("amount-input")).toBeInTheDocument();
  });
  test("renders add button", () => {
    expect(screen.getByRole("button")).toHaveTextContent("Add transaction");
  });
});

describe("inputs work", () => {
  const setup = () => {
    const utils = render(<AddTransactions />);
    const textInput = screen.getByLabelText("Text");
    const amountInput = screen.getByTestId("amount-input");
    return {
      textInput,
      amountInput,
      ...utils,
    };
  };
  test("text input works", () => {
    const { textInput } = setup();
    const input = "grocery";
    userEvent.type(textInput, input);
    expect(textInput.value).toBe(input);
  });
  test("amount input works", () => {
    const { amountInput } = setup();
    const input = "500";
    userEvent.clear(amountInput);
    userEvent.type(amountInput, input);
    expect(amountInput.value).toBe(input);
  });
});

describe("clicking add button initiates correct method", () => {
  const addTransaction = jest.fn();
  const wrapper = ({ children }) => (
    <GlobalContext.Provider value={{ addTransaction }}>
      {children}
    </GlobalContext.Provider>
  );

  test("calls addTransaction method correctly", () => {
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.123456);
    render(<AddTransactions />, { wrapper });
    const button = screen.getByRole("button");
    const textInput = screen.getByLabelText("Text");
    const amountInput = screen.getByTestId("amount-input");

    userEvent.type(textInput, "grocery");
    userEvent.clear(amountInput);
    userEvent.type(amountInput, "500");
    userEvent.click(button);
    expect(addTransaction).toHaveBeenCalledTimes(1);
    expect(addTransaction).toHaveBeenCalledWith({
      id: 12345600,
      text: "grocery",
      amount: 500,
    });
  });
});
