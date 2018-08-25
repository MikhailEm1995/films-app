import React from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { yellow50 } from 'material-ui/styles/colors';
import {
    lookFilmInfo
} from '../../actions/index';

import cn from '../../utils/cn';

@cn('film')
class FilmsListItem extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        genre: PropTypes.string,
        imdbID: PropTypes.string,
        firstFunc: PropTypes.func,
        secondFunc: PropTypes.func,
        firstBtnColor: PropTypes.string,
        secondBtnColor: PropTypes.string,
        firstBtnLabel: PropTypes.string || 'Button',
        secondBtnLabel: PropTypes.string || 'Button',
        lookFilmInfo: PropTypes.func
    };

    handleClick = () => this.props.lookFilmInfo(this.props.imdbID);

    render(cn) {
        let width = screen.width > 1169;
        let btnWidth = !width && {
            minWidth: '45px'
        } || {};
        const data = this.props;

        return (
            <TableRow
                style={ !width && {
                    padding: '0 5px'
                } || {} }
            >
                <TableRowColumn
                    style={ !width && {
                        padding: 0,
                        width: '40px'
                    } || {} }
                >
                    <div className={ cn('image-container') }>
                        <img
                            src={ data.src }
                            className={ cn('image') }
                            alt='No image'
                        />
                    </div>
                </TableRowColumn>
                <TableRowColumn
                    style={
                        !width && {
                            paddingLeft: 10,
                            paddingRight: 10
                        } || {}
                    }
                >
                    <Link
                        to='/film'
                        onClick={ this.handleClick }
                    >
                        { data.title }
                    </Link>
                </TableRowColumn>
                <TableRowColumn
                    style={ {
                        display: width ? '' : 'none'
                    } }
                >{ data.genre }</TableRowColumn>
                <TableRowColumn
                    style={ {
                        display: width ? '' : 'none'
                    } }
                >{ data.year }</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={ data.firstFunc }
                        backgroundColor={ data.firstBtnColor }
                        label={ width ? data.firstBtnLabel : '' }
                        labelColor={ yellow50 }
                        labelStyle={ { fontSize: '12px' } }
                        icon={ !width && <FontIcon
                            className='material-icons'
                            color={ yellow50 }
                        >visibility</FontIcon> }
                        style={ btnWidth }
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={ data.secondFunc }
                        backgroundColor={ data.secondBtnColor }
                        label={ width ? data.secondBtnLabel : '' }
                        labelColor={ yellow50 }
                        labelStyle={ { fontSize: '12px' } }
                        icon={ !width && <FontIcon
                            className='material-icons'
                            color={ yellow50 }
                        >grade</FontIcon> }
                        style={ btnWidth }
                    />
                </TableRowColumn>
            </TableRow>
        );
    }
}

let mapDispatchToProps = dispatch => (
    bindActionCreators({
        lookFilmInfo
    }, dispatch)
);

export { FilmsListItem };
export default connect(null, mapDispatchToProps)(FilmsListItem);
