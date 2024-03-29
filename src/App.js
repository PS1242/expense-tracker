import "./App.css";
import "./components/header/Header";
import { Header } from "./components/header/Header";
import { Balance } from "./components/balance/Balance";
import { IncomeExpenses } from "./components/incomeExpenses/IncomeExpenses";
import { TransactionList } from "./components/transactionList/TransactionList";
import { AddTransactions } from "./components/addTransactions/AddTransactions";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransactions />
      </div>
    </GlobalProvider>
  );
}

export default App;
