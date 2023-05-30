import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import TableComponent from "./components/TableComponent";
import MainPage from "./components/MainPage";
import TransactionsPage from "./components/TransactionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/transactions" Component={TransactionsPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
