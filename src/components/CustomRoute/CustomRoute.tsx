import React from 'react';
import { isAuthenticated } from '../../helpers/auth';
import { Redirect, Route } from 'react-router-dom';

interface CustomRouteProps {
    component:React.FC; 
    path: string; 
    exact: boolean;
    isPrivate: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({component, path, exact, isPrivate}) : JSX.Element => {
    const routeElement = (): JSX.Element => {
        if (isAuthenticated() && !isPrivate ) {
            return <Redirect to='/' />
        } else if (!isAuthenticated() && isPrivate) {
            return <Redirect to='/signin' />
        } else {
            return <Route path={path} exact={exact} component={component} />
        }
    }  
    return routeElement();      
}

export default CustomRoute;