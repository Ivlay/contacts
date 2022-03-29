import { combineReducers, AnyAction } from 'redux';

import contacts from './contacts/reducer';

const rootReducer = combineReducers({
  contacts,
});

export type CombinedState = ReturnType<typeof rootReducer>;

const getRootState = (state: CombinedState | undefined, action: AnyAction) => {
  return rootReducer(state, action);
}

export default getRootState;
