import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import initialState from './store/initialState';

import App from '../src/components/app/app';
import { configureStore } from './store/store';

const store = configureStore(initialState);
persistStore(store);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter basename='/'>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('react-app')
);
