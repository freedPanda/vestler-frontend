import React,{useEffect} from 'react';
import { Redirect, useLocation, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedPage from './pages/ProtectedPage';
import {gotUser} from './actions/user';

function ProtectedRoute({component}){

    /**
     * Protected Route - ensures authenticated users 
     * can access a route
     */

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state;

    const loggedIn = useSelector(state => state.user.token !== undefined);


  useEffect(()=>{

    //checking local storage for username and token
    function checkLocalStorage(){
      try{
        let user = window.localStorage.getItem('user');
        user = JSON.parse(user);
        if(user.token){
            dispatch(gotUser(user));
        }
        else{
            history.push('/signup')
        }
      }catch(err){
        console.log(err);
      }
    }
    if(!loggedIn){
        checkLocalStorage();
    }
    

  },[dispatch])
    
    return(
        
        <ProtectedPage component={component} stock={data}/>
    )

}
export default ProtectedRoute;