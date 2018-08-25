import * as actionTypes from './types';

export function waitingFilms() {
    return {
        type: actionTypes.WAITING_FILMS
    }
}

export function gotFilms(json) {
    return {
        type: actionTypes.GOT_FILMS,
        total: json.totalResults,
        films: json.Search
    }
}

export function errFilms() {
    return {
        type: actionTypes.ERR_FILMS,
        message: 'Can not get any information. Please, try again'
    }
}

export function searchFilms(title, year, type, page) {
    let url = `http://www.omdbapi.com/?apikey=e5dc19b4&s=${title}`;
    year ? url += `&y=${year}` : false;
    type ? url += `&type=${type}` : false;
    page ? url += `&page=${page}` : false;

    return function(dispatch) {
        dispatch(waitingFilms());

        return fetch(url)
            .then(
                response => response.json(),
                () => dispatch(errFilms())
            )
            .then(json => dispatch(gotFilms(json)));
    };
}

export function addToSaved(obj) {
    return {
        type: actionTypes.ADD_TO_SAVED,
        obj
    };
}

export function removeFromSaved(obj) {
    return {
        type: actionTypes.REMOVE_FROM_SAVED,
        imdbID: obj.imdbID
    };
}

export function addToWatched(obj) {
    return {
        type: actionTypes.ADD_TO_WATCHED,
        obj
    };
}

export function removeFromWatched(obj) {
    return {
        type: actionTypes.REMOVE_FROM_WATCHED,
        imdbID: obj.imdbID
    };
}

export function waitingFilmInfo() {
    return {
        type: actionTypes.WAITING_FILM_INFO
    }
}

export function gotFilmInfo(json) {
    return {
        type: actionTypes.GOT_FILM_INFO,
        json
    }
}

export function errFilmInfo() {
    return {
        type: actionTypes.ERR_FILM_INFO
    }
}

export function lookFilmInfo(imdbID) {
    let url = `http://www.omdbapi.com/?apikey=e5dc19b4&i=${imdbID}&plot=full`;

    return function(dispatch) {
        dispatch(waitingFilmInfo());

        return fetch(url)
            .then(
                response => response.json(),
                () => dispatch(errFilmInfo())
            )
            .then(json => dispatch(gotFilmInfo(json)));
    };
}
