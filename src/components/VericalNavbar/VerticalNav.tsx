import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './VerticalNav.css';

const VerticalNav: React.FC = () : JSX.Element => {
    const history = useHistory();

    const handleSignOut = (): void => {
        localStorage.removeItem('test_token');
        history.push('/signin');
    }

    const isLinkActive = (path: string): boolean => {
        return history.location.pathname === path ? true : false;
    }

    return (
        <nav className='verical-nav-wrapper'>
            <NavLink to='/' isActive={() => isLinkActive('/')} >
                <i className="far fa-compass"></i>
                Dashboard
            </NavLink>
            <NavLink to='/settings' isActive={() => isLinkActive('/settings')} >
                <i className="fas fa-cog"></i>
                Settings
            </NavLink>
            <p onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
            </p>
        </nav>
    );
}

export default VerticalNav;