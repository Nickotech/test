import React from 'react';
import './Settings.css';

const Settings: React.FC = (): JSX.Element => {
    return (
        <div className='pannel-wrapper'>
            <div className='pannel-header'>
                <h3>Settings</h3>
            </div>
            <div className='pannel-content'>
                <p>Some nice settings here.</p>
            </div>
        </div>
    );
}

export default Settings;