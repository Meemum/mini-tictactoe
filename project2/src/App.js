import './App.css';
import {useState, useEffect} from 'react';

function Square({value, onSquareClick}) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  
  );
  
}


function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turnCount, updateTurnCount] = useState(0)
  const [playerNext, setPlayerNext] = useState(true);

  useEffect(() => {
    // check for win first
    var w = calculateWinner(squares)
    if (w) {
      alert("Winner: "+ w)
    }
    if (turnCount === 9) {
      alert("Tie!");
    }
  }, [turnCount,squares]);

  function onResetClick() {
    const nextSquares = squares.slice();
    for (let i=0; i < 9; i++) {
      nextSquares[i] = null;
    }
    setPlayerNext(true);
    updateTurnCount(0);
    setSquares(nextSquares);
  };

  function handleClick(i) {
    
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (!squares[i]) {
      if (playerNext) {
        nextSquares[i] = "X";
      }
      else {
        nextSquares[i] = "O";
      }
      
      setSquares(nextSquares);
      setPlayerNext(!playerNext);
      updateTurnCount(turnCount+1);
      
    }
  
  }

  return (
    <>
      

      <div className="board-row">
        
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <button className="reset-button" onClick={onResetClick}>
        Reset
      </button>
    </>

  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="App">
     <Board/>
    </div>
  );
}

export default App;
