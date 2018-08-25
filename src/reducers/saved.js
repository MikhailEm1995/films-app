import { ADD_TO_SAVED, REMOVE_FROM_SAVED } from '../actions/types';

export default function saved(state = [], action) {
    switch (action.type) {
        case ADD_TO_SAVED: {
            let saved = state.length > 0 ? state.slice() : [];
            saved.push(action.obj);

            return saved;
        }
        case REMOVE_FROM_SAVED: {
            return state.filter( item => item.imdbID !== action.imdbID && true );
        }
        default: return state;
    }
}
