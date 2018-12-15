import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { saga } from './saga';

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

export default createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);
