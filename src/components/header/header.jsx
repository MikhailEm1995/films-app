import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import cn from '../../utils/cn';

@cn('header')
class Header extends React.Component {
    static propTypes = {
        history: PropTypes.shape().isRequired,
        location: PropTypes.shape().isRequired
    };

    toHome = () =>  this.props.history.push('/');

    toSaved = () => this.props.history.push('/favorite');

    toWatched = () => this.props.history.push('/watched');

    render(cn) {
        const { location } = this.props;
        const path = location.pathname;
        let activeTab = path === '/' ? 'home' :
            path === '/favorite' ? 'favorite' :
            'watched';

        return (
            <header className={ cn() + ' clearfix' }>
                <div className='centering'>
                    <div className={ cn('logo-container') }>
                        <span
                            className={ cn('logo') }
                            title='"Films" is the service where you can find any film you want'
                        >Films</span>
                    </div>
                    <Tabs
                        className={ cn('tabs') }
                        value={ activeTab }
                    >
                        <Tab
                            label='Home'
                            onActive={ this.toHome }
                            value='home'
                        />
                        <Tab
                            label='Favorite'
                            onActive={ this.toSaved }
                            value='favorite'
                        />
                        <Tab
                            label='Watched'
                            onActive={ this.toWatched }
                            value='watched'
                        />
                    </Tabs>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
