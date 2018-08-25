import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    lightGreen500,
    red600
} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import {
    addToWatched,
    removeFromSaved
} from '../../actions/index';
import cn from '../../utils/cn';
import FilmsList from '../films-list/films-list';
import Pager from '../pagination/pagination';

@cn('page')
class PageFavorite extends React.Component {
    static propTypes = {
        saved: PropTypes.array.isRequired,
        watched: PropTypes.array.isRequired,
        addToWatched: PropTypes.func.isRequired,
        removeFromSaved: PropTypes.func.isRequired
    };

    constructor(props) {
        super();

        this.state = {
            data: props.saved,
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

    addToWatched = (obj, title, imdbID) => {
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

    removeFromFavorite = (obj) => {
        this.props.removeFromSaved(obj);

        this.setState({
            snackbarTitle: `${obj.Title} has been successfully removed from favorite`,
            snackbarState: true
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.saved
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
                        firstBtnColor={ lightGreen500 }
                        secondBtnColor={ red600 }
                        firstBtnLabel='watched'
                        secondBtnLabel='remove'
                        firstFunc={ this.addToWatched }
                        secondFunc={ this.removeFromFavorite }
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

let mapStateToProps = ({ saved, watched }) => ({ saved, watched });
let mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToWatched,
        removeFromSaved
    }, dispatch)
);

export { PageFavorite };
export default connect(mapStateToProps, mapDispatchToProps)(PageFavorite);
