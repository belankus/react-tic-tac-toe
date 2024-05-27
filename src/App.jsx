import { useState } from "react";

function CrossLine({ winnerLane }) {
  if (winnerLane == null) return;

  if ([0, 1, 2].includes(winnerLane)) {
    return <div className="cross-line-hr"></div>;
  } else if ([3, 4, 5].includes(winnerLane)) {
    return <div className="cross-line-vr"></div>;
  } else if (winnerLane == 6) {
    return <div className="cross-line-diag-right"></div>;
  } else {
    return <div className="cross-line-diag-left"></div>;
  }
}
function Square({ value, onSquareClick, winnerLane }) {
  return (
    <button
      onClick={onSquareClick}
      className="square"
    >
      {value}
      <CrossLine winnerLane={winnerLane} />
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner[0];
  } else if (!squares.includes(null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square
          winnerLane={winner && winner[2].includes(0) ? winner[1] : null}
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          winnerLane={winner && winner[2].includes(1) ? winner[1] : null}
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          winnerLane={winner && winner[2].includes(2) ? winner[1] : null}
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
        <Square
          winnerLane={winner && winner[2].includes(3) ? winner[1] : null}
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          winnerLane={winner && winner[2].includes(4) ? winner[1] : null}
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          winnerLane={winner && winner[2].includes(5) ? winner[1] : null}
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
        <Square
          winnerLane={winner && winner[2].includes(6) ? winner[1] : null}
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          winnerLane={winner && winner[2].includes(7) ? winner[1] : null}
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          winnerLane={winner && winner[2].includes(8) ? winner[1] : null}
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <div className="history">History</div>
        <ol>{moves}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], i, [a, b, c]];
    }
  }
  return null;
}

export default App;
