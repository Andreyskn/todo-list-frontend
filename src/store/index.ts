import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducer';
import { runSagas } from '../sagas';

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

runSagas(sagaMiddleware);
