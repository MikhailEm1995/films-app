import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    lightGreen500,
    amber500
} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {
    searchFilms,
    waitingFilms,
    gotFilms,
    errFilms,
    addToWatched,
    addToSaved
} from '../../actions/index';

import cn from '../../utils/cn';

import FilmsList from '../films-list/films-list';
import Search from '../search/search';
import Pager from '../pagination/pagination';

@cn('page')
class PageMain extends React.Component {
    static propTypes = {
        found: PropTypes.oneOfType([
            PropTypes.shape(),
            PropTypes.string
        ]).isRequired,
        saved: PropTypes.array,
        watched: PropTypes.array,
        searchFilms: PropTypes.func.isRequired,
        waitingFilms: PropTypes.func.isRequired,
        gotFilms: PropTypes.func.isRequired,
        errFilms: PropTypes.func.isRequired,
        addToWatched: PropTypes.func.isRequired,
        addToSaved: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {
            title: '',
            year: '',
            genre: '',
            snackbarTitle: '',
            snackbarState: false
        };
    }

    handleClick = (title, year, type) => {
        this.setState({
            title,
            year,
            genre: type
        });

        this.props.searchFilms(title, year, type);
    };

    handlePagerClick = (num) => {
        let title = this.state.title;
        let year = this.state.year;
        let genre = this.state.genre;

        this.props.searchFilms(title, year, genre, num);
    };

    addToWatched = (obj, title, imdbID) => {
        let isDisabled = false;

        for (let i = 0, len = this.props.watched.length; i < len; i += 1) {
            if (this.props.watched[i].imdbID === imdbID) {
                isDisabled = true;
                break;
            }
        }

        if (!isDisabled) {
            this.props.addToWatched(obj);

            this.setState({
                snackbarTitle: title + ' was successfully added to watched',
                snackbarState: true
            });
        } else {
            this.setState({
                snackbarTitle: `${title} is already added to watched`,
                snackbarState: true
            });
        }
    };

    addToFavorite = (obj, title, imdbID) => {
        let isDisabled = false;

        for (let i = 0, len = this.props.saved.length; i < len; i += 1) {
            if (this.props.saved[i].imdbID === imdbID) {
                isDisabled = true;
                break;
            }
        }

        if (!isDisabled) {
            this.props.addToSaved(obj);

            this.setState({
                snackbarTitle: title + ' was successfully added to favorite',
                snackbarState: true
            });
        } else {
            this.setState({
                snackbarTitle: `${title} is already added to favorite`,
                snackbarState: true
            });
        }
    };

    handleSnackbarClose = () => this.setState({
        snackbarState: false,
        snackbarTitle: ''
    });

    renderFilmsList() {
        let films = this.props.found.films;
        let data = films instanceof Array ? films : [];

        return (
            <FilmsList
                data={ data }
                firstBtnColor={ lightGreen500 }
                secondBtnColor={ amber500 }
                firstBtnLabel='watched'
                secondBtnLabel='favorite'
                firstFunc={ this.addToWatched }
                secondFunc={ this.addToFavorite }
            />
        );
    }

    renderLoader() {
        return (
            <div className='page__loader'>
                <CircularProgress
                    size={ 120 }
                    thickness={ 10 }
                />
            </div>
        );
    }

    renderError() {
        this.setState({
            snackbarState: true,
            snackbarTitle: 'Couldn\'t show any information'
        });

        return (
            <div className='page__error'>
                <div className='page__error-text'>Oops! Something went wrong. Try again</div>
            </div>
        );
    }

    render(cn) {
        let { films } = this.props.found;

        return (
            <div className={ cn() }>
                <div className='centering'>
                    <Search
                        handleClick={ this.handleClick }
                    />
                    {
                        films === 'waiting' && this.renderLoader() ||
                        films === 'error' && this.renderError() ||
                        this.renderFilmsList()
                    }
                    <Pager
                        total={ +this.props.found.number }
                        handlePagerClick={ this.handlePagerClick }
                    />
                    <Snackbar
                        open={ this.state.snackbarState }
                        message={ this.state.snackbarTitle }
                        autoHideDuration={ 4000 }
                        onRequestClose={ this.handleSnackbarClose }
                    />
                </div>
            </div>
        );
    }
}

let mapStateToProps = ({ found, saved, watched }) => ({ found, saved, watched });
let mapDispatchToProps = dispatch => (
    bindActionCreators({
        searchFilms,
        waitingFilms,
        gotFilms,
        errFilms,
        addToWatched,
        addToSaved
    }, dispatch)
);

export { PageMain };
export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
