import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Signin from './Signin/Signin';
import Register from './Register/Register';
import MainContent from './MainContent/MainContent';
import CustomRoute from './CustomRoute/CustomRoute';

import './App.css';

function App(): JSX.Element { 
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/signin" exact={false} component={Signin} isPrivate={false} />
        <CustomRoute path="/register" exact={false} component={Register} isPrivate={false} />
        <CustomRoute path="/" exact={false} component={MainContent} isPrivate={true}  />
      </Switch>
    </BrowserRouter> 
  );
}

export default App;