import thunk from 'redux-thunk';
import root from './reducers/root';
import {createStore, applyMiddleware} from 'redux';

export const store = createStore(root,applyMiddleware(thunk));