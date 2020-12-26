import React from 'react';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import LogoutPage from './pages/LogoutPage';
import ProtectedRoute from './ProtectedRoute';
import StockDetails from './pages/StockDetails';
import SalePage from './pages/SalePage';

function Routes(){
    
    return(
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route exact path='/login'>
                <LoginPage />
            </Route>
            <Route exact path='/signup'>
                <SignupPage />
            </Route>
            
            <Route exact path='/logout'>
                <LogoutPage />
            </Route>
            <ProtectedRoute exact={true} path='/stocks' component={'stocks'} />
            <ProtectedRoute exact={true} path='/profile' component={'profile'}/>
            <Route exact path='/notfound'>
                <NotFound />
            </Route>
            <Route exact path='/servererror'>
                <ServerError />
            </Route>
            <Route path = '/stocks/sell/:symbol'>
                <SalePage />
            </Route>
            <Route path ='/stocks/:symbol'>
                <StockDetails />
            </Route>
            <ProtectedRoute path='/purchase/success' component={'purchase/success'}/>
            <ProtectedRoute path='/options/success' component={'purchase/success'}/>
            <ProtectedRoute path='/stocks/:symbol' component={'stock'}/>
            <Redirect to='/notfound'/>
        </Switch>
    )

}

export default Routes;