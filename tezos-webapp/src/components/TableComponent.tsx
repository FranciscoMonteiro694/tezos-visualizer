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
      })
      .catch((error: any) => {
        // Handle error
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
            <td>{block.level}</td>
            <td>{block.proposer?.alias}</td>
            <td></td>
            <td>{block.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
