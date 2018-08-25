import { ADD_TO_WATCHED, REMOVE_FROM_WATCHED } from '../actions/types';

export default function watched(state = [], action) {
    switch (action.type) {
        case ADD_TO_WATCHED: {
            let watched = state.length > 0 ? state.slice() : [];
            watched.push(action.obj);

            return watched;
        }
        case REMOVE_FROM_WATCHED: {
            return state.filter( item => item.imdbID !== action.imdbID && true );
        }
        default: return state;
    }
}
