import {LOAD_ERRORS} from '../actions/types';

const INIT = [];

function errors(state = INIT, action){
    switch(action.type){
        case LOAD_ERRORS:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
}
export default errors;