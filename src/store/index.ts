import {
  Store,
  createStore as createReduxStore,
  applyMiddleware,
  Middleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import rootReducer from './components/reducers';
import rootSaga from './components/sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const composeEnhancers = (...middlewares: Middleware[]) => {
  const middlewareEnhancer = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return middlewareEnhancer;
};

const createStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const composedEnhancers = composeEnhancers(sagaMiddleware);

  const store = createReduxStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
