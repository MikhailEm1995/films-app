import React from "react";
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { grey600 } from 'material-ui/styles/colors';

import cn from '../../utils/cn';

@cn('search')
class Search extends React.Component {
    static propTypes = {
        handleClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super();

        this.state = {
            title: '',
            year: '',
            type: 'movie',
            value: 1
        }
    }

    handleTitleInput = e => this.setState({ title: e.target.value });

    handleYearInput = e => this.setState({ year: e.target.value });

    handleSelectInput = (e, i, val) => this.setState({ type: val });

    handleClick = () => this.props.handleClick(this.state.title, this.state.year, this.state.type);

    render() {
        const props = this.props;

        return (
            <Card
                style={ {
                    marginBottom: '30px'
                } }
            >
                <CardHeader
                    title='Open search form'
                    actAsExpander={ true }
                    showExpandableButton={ true }
                    style={ {
                        fontWeight: 'bold'
                    } }
                    titleColor={ grey600 }
                />
                <CardText expandable={ true }>
                    <GridList
                        cols={ screen.width > 1169 ? 4 : 1 }
                        cellHeight='auto'
                    >
                        <GridTile>
                            {
                                props.err ?
                                    <TextField
                                        hintText='Type a title of a film'
                                        errorText='This field is required'
                                        onChange={ this.handleTitleInput }
                                    /> :
                                    <TextField
                                        hintText='Type a title of a film'
                                        onChange={ this.handleTitleInput }
                                    />
                            }

                        </GridTile>
                        <GridTile>
                            <TextField
                                hintText='Type a year of the film'
                                onChange={ this.handleYearInput }
                            />
                        </GridTile>
                        <GridTile>
                            <SelectField
                                value={ this.state.type }
                                onChange={ this.handleSelectInput }
                            >
                                <MenuItem value={ 'movie' } primaryText='Movie' />
                                <MenuItem value={ 'series' } primaryText='Series' />
                                <MenuItem value={ 'episode' } primaryText='Episode' />
                            </SelectField>
                        </GridTile>
                        <GridTile>
                            <RaisedButton
                                label='Search'
                                primary={ true }
                                fullWidth={ true }
                                onClick={ this.handleClick }
                            />
                        </GridTile>
                    </GridList>
                </CardText>
            </Card>
        );
    }
}

export default Search;
