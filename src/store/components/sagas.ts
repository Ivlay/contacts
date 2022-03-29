import { all, fork } from 'redux-saga/effects';

import contactsWatcher from './contacts/sagas';

export default function* rootSaga() {
  yield all([
    fork(contactsWatcher),
  ]);
}
