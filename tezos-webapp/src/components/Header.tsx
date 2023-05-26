import React, { useEffect, useState } from "react";
import "./Header.css";
import apiService from "../services/apiService.ts";

const Header = () => {
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    fetchAmountOfBlocks();
  }, []);

  const fetchAmountOfBlocks = () => {
    apiService
      .getAmountOfBlocks()
      .then((data: number) => {
        setBlocks(data);
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  return (
    <div className="header-div">
      <h1>Current blocks {blocks}</h1>
    </div>
  );
};

export default Header;
