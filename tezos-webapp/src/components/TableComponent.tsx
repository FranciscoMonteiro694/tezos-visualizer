import React, { useEffect, useState } from "react";
import "./TableComponent.css";
import apiService from "../services/apiService.ts";
import { BlockData } from "../services/apiService.ts";

const TableComponent = () => {
  const [dataBlocks, setDataBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = () => {
    apiService
      .getBlocks()
      .then((dataBlocks: BlockData[]) => {
        console.log("dataBlocks", dataBlocks);
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
        console.log("transactions", transactions);
        // TODO - Update state here
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

  return (
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
            <td>
              <a href="">{block.level}</a>
            </td>
            <td>{block.proposer?.alias}</td>
            <td>{block.transactions}</td>
            <td>{block.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
