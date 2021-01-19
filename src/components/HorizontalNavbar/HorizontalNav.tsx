import React from 'react';
import './HorizontalNav.css';

interface HorizontalNavProps {
    name: string, 
    role: string;
}

const HorizontalNav: React.FC<HorizontalNavProps> = ({name, role}) : JSX.Element => {
    return (
        <div className='horisontal-nav-wrapper'>
            <h3>dashboard</h3>
            <div className='signed-user'>
                <p>{name}</p>
                <span>{role}</span>
            </div> 
        </div>
    )
}

export default HorizontalNav;