import React from 'react';
import { Redirect, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedPage from './pages/ProtectedPage';

function ProtectedRoute({component}){

    const symbol = useParams();
    console.log(symbol);

    const loggedIn = useSelector(state => state.user.token !== undefined);

    return(
        loggedIn ? (
        <ProtectedPage component={component}/>
        ) :
        (<Redirect to='/signup'></Redirect>)
    )

}
export default ProtectedRoute;