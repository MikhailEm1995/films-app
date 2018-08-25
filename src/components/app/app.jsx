import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PageMain from '../page-main/page-main';
import PageFavorite from '../page-favorite/page-favorite';
import PageWatched from '../page-watched/page-watched';
import PageFilm from '../page-film/page-film';
import Header from '../header/header';

import cn from '../../utils/cn';

export const MAIN_PAGE_ROUTE = '/';
export const SAVED_PAGE_ROUTE = '/favorite';
export const WATCHED_PAGE_ROUTE = '/watched';
export const FILM_PAGE_ROUTE = '/film';

require('./app.css');

@cn('app')
export default class App extends React.Component {
    renderMainPage() {
        return <PageMain />;
    }

    renderSavedPage() {
        return <PageFavorite />;
    }

    renderWatchedPage() {
        return <PageWatched />;
    }

    renderErrorPage() {
        return <PageError title='Такой страницы не существует' />
    }

    renderFilmPage() {
        return <PageFilm />;
    }

    render(cn) {
        return (
            <MuiThemeProvider>
                <div className={ cn() } >
                    <Header />
                    <Switch>
                        <Route
                            exact={ true }
                            path={ MAIN_PAGE_ROUTE }
                            component={ this.renderMainPage }
                        />
                        <Route
                            exact={ true }
                            path={ SAVED_PAGE_ROUTE }
                            component={ this.renderSavedPage }
                        />
                        <Route
                            exact={ true }
                            path={ WATCHED_PAGE_ROUTE }
                            component={ this.renderWatchedPage }
                        />
                        <Route
                            exact={ true }
                            path={ FILM_PAGE_ROUTE }
                            component={ this.renderFilmPage }
                        />
                        <Route
                            path='*'
                            component={ this.renderErrorPage }
                        />
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}
