import {LOAD_USER, LOGOUT, LOGIN, UPDATE} from '../actions/types';

const INIT = {};

function user(state = INIT, action){
    switch(action.type){
        case LOAD_USER:
            console.log('loading user into redux',action)
            return {
                ...action.payload.user,token:action.payload.token
            };
        case LOGOUT:
            return INIT;
        case UPDATE:
            return{
                ...action.payload
            }
        case LOGIN:
            return{
                ...action.payload
            }
        default:
            return state;
    }
}
export default user;