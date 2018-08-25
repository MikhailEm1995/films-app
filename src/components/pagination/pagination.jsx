import React from "react";
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { cyan500, grey200 } from 'material-ui/styles/colors';

import cn from '../../utils/cn';

@cn('pagination')
class Pager extends React.Component {
    static propTypes = {
        total: PropTypes.number,
        handlePagerClick: PropTypes.func
    };

    constructor(props) {
        super();

        this.props = props;

        this.state = {
            current: 1,
            currentDecade: 1,
            leftDis: true,
            rightDis: false
        };
    }

    handleNumberClick = i => {
        let { handlePagerClick: onClick } = this.props;
        let { currentDecade, leftDis, rightDis } = this.state;
        let beginning = currentDecade === 1;
        let num = beginning && i + 1 ||
            !beginning && i - 1 + 10 * (currentDecade - 1);
        let pages = Math.ceil(this.props.total / 10);

        if (num % 10 === 9) currentDecade -= 1;
        if (num / currentDecade === 10) currentDecade += 1;
        (num === 1) ? leftDis = true : leftDis = false;
        (num === pages) ? rightDis = true : rightDis = false;

        this.setState({
            currentDecade,
            current: num,
            leftDis,
            rightDis
        });

        onClick(num);
    };

    handleArrowClick = (side, strong) => () => {
        let { handlePagerClick: onClick } = this.props;
        let { current, currentDecade } = this.state;
        let pages = Math.ceil(this.props.total / 10);
        let newState = {};
        let func;

        if (strong && side === 'l') {
            newState = {
                rightDis: false,
                leftDis: true,
                current: 1,
                currentDecade: 1
            };
            func = () => onClick(this.state.current);
        } else if (strong && side === 'r') {
            newState = {
                rightDis: true,
                leftDis: false,
                current: pages,
                currentDecade: Math.ceil(pages / 10)
            };
            func = () => onClick(this.state.current);
        } else if (side === 'l') {
            if (current === 2) newState.leftDis = true;
            if (pages > 10 && current % 10 === 0)  newState.currentDecade = currentDecade - 1;

            newState = {
                ...newState,
                rightDis: false,
                current: current - 1
            };
            func = () => onClick(this.state.current);
        } else {
            if (current === pages - 1) newState.rightDis = true;
            if (pages > 10 && current % 10 === 9) newState.currentDecade = currentDecade + 1;

            newState = {
                ...newState,
                leftDis: false,
                current: current + 1
            };
            func = () => onClick(this.state.current);
        }

        this.setState(newState, func);
    };

    renderArrows(cn, side) {
        const labelStyle = {
            font: 'bold 12px Roboto, sans-serif'
        };
        const btnStyle = {
            margin: '2px',
            minWidth: '44px'
        };

        return (
            <div
                className={ cn('arrows') + ' ' +
                (side === 'l' && cn('arrows--left') || cn('arrows--right')) }
            >
                <RaisedButton
                    label={ side === 'l' && '<<' || '>' }
                    labelColor={ cyan500 }
                    disabled={ side === 'l' ? this.state.leftDis : this.state.rightDis }
                    labelStyle={ labelStyle }
                    style={ btnStyle }
                    onClick={ side === 'l' && this.handleArrowClick('l', true) ||
                        this.handleArrowClick('r', false)
                    }
                />
                <RaisedButton
                    label={ side === 'l' && '<' || '>>' }
                    labelColor={ cyan500 }
                    disabled={ side === 'l' ? this.state.leftDis : this.state.rightDis }
                    labelStyle={ labelStyle }
                    style={ btnStyle }
                    onClick={ side === 'l' && this.handleArrowClick('l', false) ||
                        this.handleArrowClick('r', true)
                    }
                />
            </div>
        );
    }

    renderNumbers(cn) {
        let { handlePagerClick: onClick } = this.props;
        let elems = [];
        let pages = Math.ceil(this.props.total / 10);
        const btnStyle = {
            margin: '2px',
            minWidth: '44px'
        };

        if (pages <= 10) {
            for (let i = 0; i < pages; i+=1) {
                elems.push(
                    <RaisedButton
                        key={ `pageNumber${i}` }
                        label={ i + 1 }
                        labelColor={ cyan500 }
                        style={ btnStyle }
                        onClick={ () => {
                            this.setState({
                                current: i + 1
                            });
                            onClick(i + 1);
                        } }
                        backgroundColor={ this.state.current === i + 1 ? grey200 : 'white' }
                    />
                );
            }
        } else {
            let { current, currentDecade, leftDis, rightDis } = this.state;
            let numbers = currentDecade === Math.ceil(pages / 10) ?
                pages % 10 : 10 - 1;
            if (leftDis === false && currentDecade !== 1) numbers += 2;
            if (rightDis === false && currentDecade !== Math.ceil(pages / 10)) numbers += 1;

            for (let i = 0; i < numbers; i += 1) {
                let beginning = currentDecade === 1;
                let end = currentDecade === Math.ceil(pages / 10);

                elems.push(
                    <RaisedButton
                        key={ `pageNumber${i}` }
                        label={ (!beginning && i === 0) ? '...' :
                            (!end && i === numbers - 1) ? '...' :
                            (!beginning) ? (i - 1 + 10 * (currentDecade - 1)) :
                            i + 1
                        }
                        labelColor={ cyan500 }
                        style={ btnStyle }
                        backgroundColor={
                            current === (i + 1 + (currentDecade - 1) * 10) && beginning ? grey200 :
                            current === (i - 1 + (currentDecade - 1) * 10) && !beginning ? grey200 :
                            'white'
                        }
                        onClick={ () => {
                            this.handleNumberClick(i)
                        } }
                    />
                );
            }
        }

        return (
            <div className={ cn('numbers') }>
                { elems }
            </div>
        );
    }

    render(cn) {
        let pages = Math.ceil(this.props.total / 10);
        let isDisplay = pages > 1;

        return (
            <div className={ cn() + ' clearfix' }>
                { isDisplay && this.renderArrows(cn, 'l') }
                { isDisplay && screen.width > 1169 && this.renderNumbers(cn) }
                { isDisplay && this.renderArrows(cn, 'r') }
            </div>
        );
    }
}

export default Pager;
