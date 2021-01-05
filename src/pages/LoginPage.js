import React,{useEffect} from 'react';
import LoginForm from '../forms/LoginForm';
import {Container} from 'reactstrap';
import '../css/pages.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {gotUser} from '../actions/user';
function LoginPage(){

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{

        function checkLocalStorage(){
          try{
            let user = window.localStorage.getItem('user');
            user = JSON.parse(user);
            if(user.token){
                dispatch(gotUser(user));
                history.push('/profile');
            }
          }catch(err){
            console.log(err);
          }
        }
    
        checkLocalStorage();
    
      },[])
      
    return(
        <Container fluid={true} className={'form-container'}>
            <LoginForm />
        </Container>
    )
}
export default LoginPage;