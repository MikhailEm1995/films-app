import {
    WAITING_FILM_INFO,
    GOT_FILM_INFO,
    ERR_FILM_INFO
} from '../actions/types';

export default function film(state = '', action) {
    switch (action.type) {
        case WAITING_FILM_INFO: {
            return 'waiting'
        }
        case GOT_FILM_INFO: {
            return action.json;
        }
        case ERR_FILM_INFO: {
            return `error`;
        }
        default: return state;
    }
}
