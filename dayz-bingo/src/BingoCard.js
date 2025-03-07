import React, { useState, useEffect } from 'react';
import events from './events.json';

const gridSize = 5;

const BingoCard = () => {
  const [card, setCard] = useState([]);
  const [bingo, setBingo] = useState(false);
  const [bingoCount, setBingoCount] = useState(0);

  // Generate a new bingo card
  const generateCard = () => {
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    const newCard = [];
    for (let i = 0; i < gridSize; i++) {
      newCard[i] = [];
      for (let j = 0; j < gridSize; j++) {
        if (i === 2 && j === 2) {
          newCard[i][j] = { text: 'FREE', marked: true };
        } else {
          newCard[i][j] = { text: shuffled.pop(), marked: false };
        }
      }
    }
    return newCard;
  };

  // Create initial card on mount
  useEffect(() => {
    setCard(generateCard());
  }, []);

  // Check for bingo (rows, columns, diagonals)
  const checkBingo = (card) => {
    // Check rows
    for (let i = 0; i < gridSize; i++) {
      if (card[i].every(cell => cell.marked)) return true;
    }
    // Check columns
    for (let j = 0; j < gridSize; j++) {
      let colBingo = true;
      for (let i = 0; i < gridSize; i++) {
        if (!card[i][j].marked) {
          colBingo = false;
          break;
        }
      }
      if (colBingo) return true;
    }
    // Check diagonals
    let diag1 = true;
    let diag2 = true;
    for (let i = 0; i < gridSize; i++) {
      if (!card[i][i].marked) diag1 = false;
      if (!card[i][gridSize - 1 - i].marked) diag2 = false;
    }
    return diag1 || diag2;
  };

  // Toggle cell state on click and check for bingo
  const handleClick = (row, col) => {
    setCard(prev => {
      const newCard = prev.map(r => r.slice());
      newCard[row][col].marked = !newCard[row][col].marked;
      if (checkBingo(newCard) && !bingo) {
        setBingo(true);
        setBingoCount(bingoCount + 1);
      }
      return newCard;
    });
  };

  // Reset the card and hide the bingo overlay
  const resetCard = () => {
    setCard(generateCard());
    setBingo(false);
  };

  return (
    <div className="bingo-container">
      <div className="bingo-counter">Bingos: {bingoCount}</div>
      {bingo && (
        <div className="bingo-overlay">
          <div className="bingo-message-container">
            <div className="bingo-message">Bingo!</div>
            <button className="reset-button" onClick={resetCard}>
              Reset Card
            </button>
          </div>
        </div>
      )}
      <div className="bingo-card">
        {card.map((row, i) => (
          <div className="bingo-row" key={i}>
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`bingo-cell ${cell.marked ? 'marked' : ''}`}
                onClick={() => handleClick(i, j)}
              >
                {cell.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;
