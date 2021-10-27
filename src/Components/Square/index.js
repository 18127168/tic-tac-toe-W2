import React from "react";

/**
 * The square component
 * 
 * @param { string } className
 * @param { callback } click
 * @param { string } value
 * 
 * @return { JSX.Element }
 */
const Square = ({ className, click, value }) => (
    <button className={'square ' + className ?? ''} onClick={click}>
    {value}
    </button>
);  

export default Square;