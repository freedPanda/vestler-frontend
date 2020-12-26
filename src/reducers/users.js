/**
 * users - general info about users.
 */
import {LOAD_USERS} from '../actions/types';

const INIT = {};

function users(state = INIT,action){
    switch (action.type){
        case LOAD_USERS:
            //want users to be stored in objects by their id
            //as a prop with user object being the value;
            const uObjList = {};
            for(let u of action.payload){
                uList[u.id] = u;
            }
            return {...uObjList}
        default:
            return state;
    }
}

export default users;