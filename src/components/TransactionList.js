import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => {
          const sign = transaction.amount < 0 ? "-" : "+";
          const color = transaction.amount < 0 ? "minus" : "plus";
          return (
            <li className={color} key={transaction.id}>
              {transaction.text}
              <span>
                {sign}${Math.abs(transaction.amount)}
              </span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-btn"
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
