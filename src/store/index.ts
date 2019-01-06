import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducer';
import { runSagas } from '../sagas';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    application: reducer,
  });

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  createReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

runSagas(sagaMiddleware);
