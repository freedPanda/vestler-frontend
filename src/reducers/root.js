import {combineReducers} from 'redux';

import users from './user';
import user from './user';
import errors from './errors';
import stocks from './stocks';

export default combineReducers({
    users,user,errors,stocks
});