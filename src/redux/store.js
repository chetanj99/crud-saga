import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
// import logger from "redux-logger";

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// middlewares.push(logger)

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga)

export default store