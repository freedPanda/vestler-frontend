import axios from 'axios';
import {LOAD_USER, LOAD_ERRORS, LOGOUT} from './types';
import {handleError} from '../helpers/errors';

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function signup(user){
    return async function(dispatch){
        try{
            const res = await axios.post(`${BASE_API_URL}/users`,user);
            dispatch(gotUser(res.data.regData));
            return true;
        }catch(err){
            let error = handleError(err);
            if(error.status === 400){
                dispatch(gotErrors(error.messages))
            }
            return {error:error};
        }
    };
}
function login(user){
    return async function(dispatch){
        try{
            const res = await axios.post(`${BASE_API_URL}/login`,user);
            dispatch(gotUser(res.data.loginData));
            return true;
        }catch(err){
            console.log('login');
            return {error:err};
        }
    }
}
function gotUser(user){
    return{type:LOAD_USER, payload:user};
};
function gotErrors(error){
    return{type:LOAD_ERRORS, payload:error}
}
function logout(){
    return{type:LOGOUT}
}

export {signup,login,logout};