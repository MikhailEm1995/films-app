import { GOT_FILMS, WAITING_FILMS, ERR_FILMS } from '../actions/types';

export default function search(state = '', action) {
    switch (action.type) {
        case WAITING_FILMS: {
            return Object.assign(
                { ...state },
                {
                    number: 'waiting',
                    films: 'waiting'
                }
            );
        }
        case GOT_FILMS: {
            return Object.assign(
                { ...state },
                {
                    number: action.total,
                    films: action.films
                }
            );
        }
        case ERR_FILMS: {
            return Object.assign(
                { ...state },
                {
                    number: 'error',
                    films: 'error'
                }
            )
        }
        default: return state;
    }
}
