import React from 'react';
import BingoCard from './BingoCard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CamCANTRUN DayZ Bingo</h1>
      </header>
      <BingoCard />
    </div>
  );
}

export default App;
