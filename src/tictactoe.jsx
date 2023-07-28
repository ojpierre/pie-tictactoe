import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  margin: 40px;
`;

const Heading = styled.h1`
  font-size: 48px;
  color: #3f51b5;
  margin-bottom: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  grid-gap: 10px;
  opacity: ${({ winner }) => (winner ? "0.6" : "1")};
  pointer-events: ${({ winner }) => (winner ? "none" : "auto")};
  transition: opacity 0.3s ease;
  animation: ${fadeIn} 0.3s ease;
`;

const Square = styled.button`
  font-size: 36px;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #3f51b5;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a237e;
  }
`;

const RefreshButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  background-color: #f50057;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c51162;
  }
`;

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRefresh = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    return <Square onClick={() => handleClick(i)}>{squares[i]}</Square>;
  };

  return (
    <GameContainer>
      <Heading>Pie TicTacToe</Heading>
      <Board winner={winner}>
        {Array(9)
          .fill()
          .map((_, i) => (
            <React.Fragment key={i}>{renderSquare(i)}</React.Fragment>
          ))}
      </Board>
      <div style={{ marginTop: "20px", fontSize: "20px", color: "#3f51b5" }}>
        {status}
      </div>
      <RefreshButton onClick={handleRefresh}>Start Again</RefreshButton>
    </GameContainer>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
