import React,{useEffect} from 'react';
import { Redirect, useLocation, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedPage from './pages/ProtectedPage';
import {gotUser} from './actions/user';

function ProtectedRoute({component}){

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state;
    console.log('symbol at protected route',data);

    const loggedIn = useSelector(state => state.user.token !== undefined);


  useEffect(()=>{

    function checkLocalStorage(){
      try{
        let user = window.localStorage.getItem('user');
        user = JSON.parse(user);
        if(user.token){
            console.log('local storage result ', user);
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