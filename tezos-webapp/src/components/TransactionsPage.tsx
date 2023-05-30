import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService, { TransactionsData } from "../services/apiService";

const TransactionsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [transactionsData, setTransactionsData] = useState<TransactionsData[]>(
    []
  );

  const currentItems = transactionsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (level === null) {
      // level is null
      console.log("Level is null");
    } else {
      // level is not null
      console.log("Level is not null");
      fetchTransactionsData(parseInt(level));
    }
  }, []);

  const fetchTransactionsData = (levelToFetch: number) => {
    apiService
      .getTransactionsDataByLevel(levelToFetch)
      .then((transactionsData: TransactionsData[]) => {
        console.log("dataBlocks", transactionsData);
        setTransactionsData(transactionsData);
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  return (
    <div>
      <h2>Transactions Page</h2>
      <p>Level: {level}</p>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Target</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transactionData) => (
            <tr>
              <td>
                {transactionData.sender.address}
                {transactionData.sender.alias}
              </td>
              <td>
                {transactionData.target.address}
                {transactionData.target.alias}
              </td>
              <td>{transactionData.amount}</td>
              <td>{transactionData.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= transactionsData.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TransactionsPage;
