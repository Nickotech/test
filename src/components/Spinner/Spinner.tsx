import React from 'react';
import './Spinner.css';

const Spinner: React.FC = () : JSX.Element => {
    return (
        <div id="overlay">
            <div className="loader"></div>
        </div>
    )
}

export default Spinner;