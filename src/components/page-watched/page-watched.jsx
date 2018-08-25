import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    amber500,
    red600
} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import {
    addToSaved,
    removeFromWatched
} from '../../actions/index';
import cn from '../../utils/cn';
import FilmsList from '../films-list/films-list';
import Pager from '../pagination/pagination';

@cn('page')
class PageWatched extends React.Component {
    static propTypes = {
        watched: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        addToSaved: PropTypes.func.isRequired,
        removeFromWatched: PropTypes.func.isRequired
    };

    constructor(props) {
        super();

        this.state = {
            data: props.watched,
            snackbarState: false,
            snackbarTitle: '',
            page: 0
        }
    }

    handlePagerClick = (num) => this.setState({ page: num - 1 });

    handleSnackbarClose = () => this.setState({
        snackbarState: false,
        snackbarTitle: ''
    });

    addToFavorite = (obj, title, imdbID) => {
        let isDisabled = false;
        let { saved } = this.props;

        for (let i = 0, len = saved.length; i < len; i += 1) {
            if (saved[i].imdbID === imdbID) {
                isDisabled = true;
                break;
            }
        }

        if (!isDisabled) {
            this.props.addToSaved(obj);

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

    removeFromWatched = (obj) => {
        this.props.removeFromWatched(obj);

        this.setState({
            snackbarTitle: `${obj.Title} has been successfully removed from watched`,
            snackbarState: true
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.watched
        });
    }

    render(cn) {
        let i = 10 * this.state.page;
        let numOfResults = this.state.data.length;
        let max = ((this.state.page + 1) === Math.ceil(numOfResults / 10)) ?
            numOfResults - i : numOfResults !== 0 ? 10 : 0;
        let data = [];

        if (i < max) {
            data = this.state.data.slice(i, max);
        } else {
            max += i;
            data = this.state.data.slice(i, max);
        }

        return (
            <div className={ cn() }>
                <div className='centering'>
                    <FilmsList
                        data={ data }
                        firstBtnColor={ amber500 }
                        secondBtnColor={ red600 }
                        firstBtnLabel='favorite'
                        secondBtnLabel='remove'
                        firstFunc={ this.addToFavorite }
                        secondFunc={ this.removeFromWatched }
                    />
                    <Pager
                        total={ numOfResults }
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

let mapStateToProps = ({ watched, saved }) => ({ watched, saved });
let mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToSaved,
        removeFromWatched
    }, dispatch)
);

export { PageWatched };
export default connect(mapStateToProps, mapDispatchToProps)(PageWatched);
