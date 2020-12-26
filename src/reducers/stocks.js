import { LOAD_STOCKS } from '../actions/types';

const INIT = {};

function stocks(state = INIT, action){
    switch(action.type){
        case LOAD_STOCKS:
            let newState = {};
            for(let stock of action.payload.stocks){
                newState[stock.symbol] = stock;
            }
            return newState;
        default:
            return state;
    }
}
export default stocks;