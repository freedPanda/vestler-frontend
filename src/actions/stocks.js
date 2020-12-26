import axios from 'axios';
import {LOAD_STOCKS} from './types';
import { handleError } from '../helpers/errors';

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function getStocks(token){
    return async function(dispatch){
        try{
            const res = await axios.get(`${BASE_API_URL}/stocks?_token=${token}`);
            
            dispatch(loadStocks(res.data));
        }catch(err){
            console.log('this is the stock error',err)
            let error = handleError(err);
            return {error:error};
        }
    }
}
function loadStocks(stocks){
    return{type:LOAD_STOCKS,payload:stocks};
}
export {getStocks};