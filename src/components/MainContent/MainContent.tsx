import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HorizontalNav from '../HorizontalNavbar/HorizontalNav';
import VerticalNav from '../VericalNavbar/VerticalNav';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../SettingsComponent/Settings';

import { getTokenPayload } from '../../helpers/auth';
import { ITokenData } from '../../models/types';
import './MainContent.css';

const MainContent: React.FC = (): JSX.Element => {
    const {name, role} = getTokenPayload() as ITokenData;

    return (
        <div className='main-content-wrapper'>
            <HorizontalNav name={name} role={role} />
            <div className='main-content'>
                <VerticalNav />
                <Switch>
                    <Route path="/" exact={true}  component={Dashboard} />
                    <Route path="/settings" exact={false} component={Settings} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </div>
    );
}

export default MainContent;