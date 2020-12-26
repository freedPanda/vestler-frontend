import React, { useEffect } from 'react';
import {Container} from 'reactstrap';
import {useDispatch} from 'react-redux';
import {LOGOUT} from '../actions/types';
import { logout } from '../actions/user';

function LogoutPage(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logout());
    },[])
    return(
        <Container>
            <h2>Logged out</h2>
        </Container>
    )
}

export default LogoutPage;