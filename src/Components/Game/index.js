import React, { useState } from "react";
import Board from "../Board";

/**
 * Calculate the position function
 * 
 * @param { number } position
 * 
 * @return { Object}
 */
function calculatePosition(position){
    const col = position%5;
    const row = Math.floor(position/5);
  
    return { col, row}
}

/**
 * Calculate the position function
 * 
 * @param { array } squares
 * 
 * @return { Object}
 */
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] &&
          squares[a] === squares[c] && squares[a] === squares[d] && 
          squares[a] === squares[e]) {
        return {win: true, winner: squares[a], winningLine: [a, b, c, d, e]} ;
      }
    }
  
    for (let i = 0; i < squares.length; i++){
      if (squares[i] === null || squares[i] === undefined){
        return null;
      }
    }
  
    return {win: false} ;
}

/**
 * The game component
 * 
 * @return { JSX.Element }
 */
const Game = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [sortedAsc, setSortedAsc] = useState(true);
    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null),
            col: null,
            row: null
        }
    ]);
 
    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        let postion = calculatePosition(i);
        let winning = calculateWinner(squares);
    
        if (winning !== null || (squares[i] !== null && squares[i] !== undefined)) {
          return;
        } 
        
        squares[i] = isXNext ? "X" : "O";
        setHistory(newHistory.concat([
            {
              squares: squares,
              row: postion.row,
              col: postion.col
            }
        ]));
        setStepNumber(newHistory.length)
        setIsXNext(!isXNext);
         
    }

    const jumpTo = (step) => {
        
        setStepNumber(step);
        setIsXNext((step % 2) === 0);
    }

    const newHistory = history;
    const current = newHistory[stepNumber];
    const winning = calculateWinner(current.squares);
    const moves = newHistory.map((step, move) => {
    const desc = move ?
        'Go to move #' + move + "(" + step.col + ", " + step.row + ")" :
        'Go to game start';
    return (
        <li key={move}>
        <button
            className={move === stepNumber ? "textBold" : ""} 
            onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    );
    });
  
    let status;
    if (winning === null) {
        status = "Next player: " + (isXNext ? "X" : "O");
    } else if (winning.win) {
        status = "Winner: " + winning.winner;
    } else {
        status = "This match is draw!"
    }

    return (
        <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                winningLine={ winning? (winning.winningLine ?? null) : null }
                onClick={i => handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <button onClick={() => setSortedAsc(!sortedAsc)}> Sort The Move </button>
            <ol>{ sortedAsc? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}
  
export default Game;