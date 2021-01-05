import React, {useEffect} from 'react';
import {Jumbotron} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {gotUser} from '../actions/user';

function HomePage(){

    const dispatch = useDispatch();
    const history = useHistory();

  useEffect(()=>{

    function checkLocalStorage(){
      
        let user = window.localStorage.getItem('user');
        user = JSON.parse(user);
        if(user){
            dispatch(gotUser(user));
            history.push('/profile');
        }
    }

    checkLocalStorage();

  },[])
    return(
        <Jumbotron>
            <h1>Welcome to Vestler</h1>
        </Jumbotron>
    )
}
export default HomePage;