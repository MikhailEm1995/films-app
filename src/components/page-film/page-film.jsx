import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import {
    lightGreen500,
    amber500,
    yellow50
} from 'material-ui/styles/colors';
import {
    addToWatched,
    addToSaved,
    lookFilmInfo
} from '../../actions/index';
import cn from '../../utils/cn';

@cn('page')
class PageFilm extends React.Component {
    static propTypes = {
        film: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape()
        ]),
        saved: PropTypes.array,
        imdbID: PropTypes.string,
        watched: PropTypes.array,
        addToWatched: PropTypes.func.isRequired,
        addToSaved: PropTypes.func.isRequired,
        lookFilmInfo: PropTypes.func.isRequired
    };

    constructor(props) {
        super();

        this.state = {
            data: props.film,
            snackbarState: false,
            snackbarTitle: ''
        }
    }

    handleSnackbarClose = () => this.setState({
        snackbarState: false,
        snackbarTitle: ''
    });

    addToFavorite = () => {
        let { saved } = this.props;
        let { data } = this.state;
        let obj = {
            Title: data.Title,
            Poster: data.Poster,
            Type: data.Type,
            Year: data.Year,
            imdbID: data.imdbID
        };
        let title = data.Title;
        let imdbID = data.imdbID;

        let isDisabled = false;

        for (let i = 0, len = saved.length; i < len; i += 1) {
            if (saved[i].imdbID === imdbID) {
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

    addToWatched = () => {
        let { data } = this.state;
        let obj = {
            Title: data.Title,
            Poster: data.Poster,
            Type: data.Type,
            Year: data.Year,
            imdbID: data.imdbID
        };
        let title = data.Title;
        let imdbID = data.imdbID;

        let isDisabled = false;
        let { watched } = this.props;

        for (let i = 0, len = watched.length; i < len; i += 1) {
            if (watched[i].imdbID === imdbID) {
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

    renderFilmsInfo() {
        let { data } = this.state;
        let tableData = [
            data.imdbRating,
            data.Type,
            data.Year,
            data.Runtime,
            data.Genre,
            data.Production,
            data.Country
        ];
        let text = ['imdb Rating', 'Type', 'Year', 'Duration', 'Genre', 'Production', 'Country'];

        return (
            <div className='film'>
                <div className='film__poster-container'>
                    <img src={ data.Poster } alt='No image' className='film__poster'  />
                </div>
                <div className='film__info'>
                    <div className="film__text">
                        <h1 className='film__title'>{ data.Title || 'Film' }</h1>
                        <p className='film__descr'>{ data.Plot || 'Description not provided' }</p>
                    </div>
                    <div className='film__btns'>
                        <div className='film__btn-container'>
                            <RaisedButton
                                backgroundColor={ lightGreen500 }
                                label={ 'watched' }
                                labelColor={ yellow50 }
                                labelStyle={ { fontSize: '16px' } }
                                onClick={ this.addToWatched }
                                fullWidth={ true }
                            />
                        </div>
                        <div className='film__btn-container'>
                            <RaisedButton
                                backgroundColor={ amber500 }
                                label={ 'favorite' }
                                labelColor={ yellow50 }
                                labelStyle={ { fontSize: '16px' } }
                                onClick={ this.addToFavorite }
                                fullWidth={ true }
                            />
                        </div>
                    </div>
                </div>
                <div className='film__details'>
                    <Table
                        style={ {
                            backgroundColor: '#f7f7f7'
                        } }
                        selectable={ false }
                    >
                        <TableHeader
                            displaySelectAll={ false }
                            adjustForCheckbox={ false }
                        >
                            <TableRow>
                                <TableHeaderColumn
                                    colSpan='2'
                                    style={ {
                                        textAlign: 'left',
                                        fontSize: '20px'
                                    } }
                                >Film details</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={ false }
                        >{ tableData.map((item, i) => (
                            <TableRow key={ `filmDetails${i}` }>
                                <TableRowColumn
                                    style={ {
                                        textAlign: 'center'
                                    } }
                                    className='film__row-name'
                                >{ text[i] }</TableRowColumn>
                                <TableRowColumn
                                    style={ {
                                        textAlign: 'center'
                                    } }
                                    className='film__row-value'
                                >{ tableData[i] || 'N/A' }</TableRowColumn>
                            </TableRow>
                        )) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    renderError() {
        this.setState({
            snackbarState: true,
            snackbarTitle: 'Sorry, couldn\'t show any information'
        });

        return (
            <div className='page__error'>
                <div className='page__error-text'>Oops! Something went wrong. Try again</div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.film
        });
    }

    render(cn) {
        const { data } = this.state;

        return (
            <div className={ cn() }>
                <div className='centering'>
                    {
                        data === 'waiting' || '' && this.renderLoader() ||
                        data === 'error' && this.renderError() ||
                        this.renderFilmsInfo()
                    }
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

let mapStateToProps = ({ film, saved, watched }) => ({ film, saved, watched });
let mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToWatched,
        addToSaved,
        lookFilmInfo
    }, dispatch)
);

export { PageFilm };
export default connect(mapStateToProps, mapDispatchToProps)(PageFilm);