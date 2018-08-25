import React from "react";
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHeaderColumn
} from 'material-ui/Table';
import FilmsListItem from '../list-item/list-item';

import cn from '../../utils/cn';

@cn('film')
class FilmsList extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        firstFunc: PropTypes.func,
        secondFunc: PropTypes.func,
        firstBtnColor: PropTypes.string,
        secondBtnColor: PropTypes.string,
        firstBtnLabel: PropTypes.string,
        secondBtnLabel: PropTypes.string
    };

    renderHeader(text) {
        return (
            <TableHeader
                displaySelectAll={ false }
                adjustForCheckbox={ false }
            >
                <TableRow style={ { backgroundColor:'#e8e8e8' } }>
                    <TableHeaderColumn
                        colSpan='6'
                        style={ {
                            textAlign: 'left',
                            fontSize: '20px'
                        } }
                    >{text}
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
        );
    }

    render() {
        const { data } = this.props;
        const props = this.props;
        return (
            <Table
                selectable={ false }
                style={ screen.width > 1169 && {
                    backgroundColor: '#f7f7f7'
                } || {} }
            >
                { data.length !== 0 && this.renderHeader('Found films') || this.renderHeader('No films')}
                <TableBody
                    displayRowCheckbox={ false }
                >
                    {
                        data? data.map( (row, index) => (
                            <FilmsListItem
                                key={ `film${index}` }
                                src={ row.Poster }
                                title={ row.Title }
                                year={ row.Year }
                                genre={ row.Type }
                                imdbID={ row.imdbID }
                                firstBtnColor={ props.firstBtnColor }
                                secondBtnColor={ props.secondBtnColor }
                                firstFunc={
                                    () => {
                                        this.props.firstFunc({
                                            Title: row.Title,
                                            Poster: row.Poster,
                                            Type: row.Type,
                                            Year: row.Year,
                                            imdbID: row.imdbID
                                        }, row.Title, row.imdbID)
                                    }
                                }
                                secondFunc={
                                    () => {
                                        this.props.secondFunc({
                                            Title: row.Title,
                                            Poster: row.Poster,
                                            Type: row.Type,
                                            Year: row.Year,
                                            imdbID: row.imdbID
                                        }, row.Title, row.imdbID)
                                    }
                                }
                                firstBtnLabel={ props.firstBtnLabel }
                                secondBtnLabel={ props.secondBtnLabel }
                            />
                        )) : ''
                    }
                </TableBody>
            </Table>
        );
    }
}

export default FilmsList;
