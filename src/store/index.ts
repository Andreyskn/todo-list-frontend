import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { saga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const devToolsExt = (window as any).devToolsExtension && (window as any).devToolsExtension();

export default createStore(reducer, compose(applyMiddleware(sagaMiddleware), devToolsExt));

sagaMiddleware.run(saga);