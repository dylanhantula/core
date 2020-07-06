import React from 'react';
import './AUButton.css';

const AUButton = (props) => {
    return (
        <button className="AUGlobalButton">{props.text}</button>
    );
}

export default AUButton;
