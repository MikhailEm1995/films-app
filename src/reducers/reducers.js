import { combineReducers } from 'redux';

import search from './search';
import saved from './saved';
import watched from './watched';
import film from './film';

const reducers = {
    found: search,
    saved,
    watched,
    film
};

export default combineReducers(reducers);
