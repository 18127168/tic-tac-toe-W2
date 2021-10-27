import React from "react";
import Square from "../Square";

/**
 * The board component
 * 
 * @param { array } winningLine
 * @param { array } squares
 * @param { callback } onClick
 * 
 * @return { JSX.Element }
 */
const Board = ({squares, winningLine, onClick}) => {

    const renderSquare = (i) => {
        return (
        <Square
          class={ ((winningLine !== null && winningLine.includes(i))? "hightlightCell" : "") }
          value={ squares[i] }
          click={ () => onClick(i) }
        />
      );
    }
    
    const getRow = (i) => {
        let items = [];
        for (let j = 0; j < 5; j++) {
            items.push(renderSquare(i*5+j));
        }

        return <div className="board-row">{items}</div>;
    }

    const getCol = () => {  
        let items = [];
    
        items.push(<div></div>)
        for (let i = 0; i < 5; i++) {
            items.push(getRow(i));
        }

        return items;
    }

    return <div>{getCol()}</div>;
};

export default Board;