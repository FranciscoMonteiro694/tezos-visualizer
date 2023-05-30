import React, { useEffect, useState } from "react";
import "./TableComponent.css";
import apiService from "../services/apiService.ts";
import { BlockData } from "../services/apiService.ts";

const TableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  //const indexOfLastItem = currentPage * itemsPerPage;
  //const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [dataBlocks, setDataBlocks] = useState<BlockData[]>([]);

  //let currentItems = dataBlocks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    // Fetch more blocks
    fetchBlocksBelowLevel(dataBlocks[dataBlocks.length - 1].level);
    console.log("level", dataBlocks[dataBlocks.length - 1].level);
    //currentItems = dataBlocks.slice(indexOfFirstItem, indexOfLastItem);
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = () => {
    apiService
      .getBlocks()
      .then((dataBlocks: BlockData[]) => {
        setDataBlocks(dataBlocks);

        // fetch transactions
        dataBlocks.forEach((block) => {
          const newTransactions = fetchTransactionsByLevel(block.level);
        });
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  const fetchBlocksBelowLevel = (level: number) => {
    apiService
      .getBlocksBelowGivenLevel(level)
      .then((dataBlocks: BlockData[]) => {
        setDataBlocks(dataBlocks);

        // fetch transactions
        dataBlocks.forEach((block) => {
          const newTransactions = fetchTransactionsByLevel(block.level);
        });
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  const fetchTransactionsByLevel = (level: number) => {
    apiService
      .getTransactionsByLevel(level)
      .then((transactions: number) => {
        updateTransactionsByLevel(level, transactions);
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  const updateTransactionsByLevel = (level: number, transactions: number) => {
    setDataBlocks((prevArray) => {
      return prevArray.map((blockData) => {
        if (blockData.level === level) {
          return {
            ...blockData,
            transactions: transactions,
          };
        }
        return blockData;
      });
    });
  };

  const handleClick = (level: number) => {
    window.open(`${window.location.origin}/transactions?level=${level}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Proposer</th>
            <th>Transactions</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {dataBlocks.map((block) => (
            <tr key={block.level}>
              <td id="level-td" onClick={() => handleClick(block.level)}>
                {block.level}
              </td>
              <td>{block.proposer?.alias}</td>
              <td>{block.transactions}</td>
              <td>{block.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default TableComponent;
