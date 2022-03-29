import {
  debounce,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { RootState } from 'src/store';
import callAxios from 'src/store/effects';

import { Contact, SearchParams } from './types';

import actionTypes from './action-type';
import actions from './actions';

function* getContactsSaga(): Generator {
  try {
    // @ts-ignore
    const searchParams: SearchParams = yield select((state: RootState) => state.contacts.searchParams);
    const searchValue = yield select((state) => state.contacts.searchValue);

    // @ts-ignore
    const { data, headers } = yield callAxios({
      url: '/api/contacts',
      params: {
        ...searchParams,
        q: searchValue || null,
      },
    });

    yield put(actions.updateTotal(parseFloat(headers['x-total-count'])));

    yield put(actions.getContactsSuccess(data));
  } catch (error: any) {
    yield put(actions.getContactsFailure(error?.message));
  }
};

function* removeContactSaga({ payload }: ReturnType<typeof actions.removeContact>): Generator {
  try {
    const searchParams = yield select((state) => state.contacts.searchParams._page);

    yield callAxios({
      method: 'DELETE',
      url: `api/contacts/${payload}`,
    });

    // @ts-ignore
    const { data, headers } = yield callAxios({
      method: 'GET',
      url: 'api/contacts',
      params: {
        _page: `${searchParams}0`,
        _limit: 1,
      },
    });
    yield put(actions.updateTotal(parseFloat(headers['x-total-count'])));
    yield put(actions.removeContactSuccess(payload));
    yield put(actions.addContactSuccess(data));
  } catch (error) {
    yield put(actions.removeContactFailure(error));
  }
};

function* addContactSaga({ payload }: ReturnType<typeof actions.addContact>) {
  // @ts-ignore
  const totalCount = yield select((state) => state.contacts.total);
  try {
    const { data }: { data: Contact } = yield callAxios({
      method: 'POST',
      url: 'api/contacts',
      data: payload,
    });
    yield put(actions.addContactSuccess(data));
    yield put(actions.updateTotal(totalCount + 1));
  } catch (error) {
    yield put(actions.addContactFailure(error));
  }
};

function* editContactSendSaga({ payload }: ReturnType<typeof actions.editContactSend>) {
  try {
    const { data }: { data: Contact } = yield callAxios({
      method: 'PUT',
      url: `api/contacts/${payload.id}`,
      data: payload,
    });

    yield put(actions.editContactReset());
    yield put(actions.editContactSuccess(data));
  } catch (error) {
    yield put(actions.editContactFailure(error));
  }
}

export default function* contactsWatcher() {
  yield takeLatest(actionTypes.GET_CONTACTS, getContactsSaga);
  yield takeLatest(actionTypes.REMOVE_CONTACT, removeContactSaga);
  yield debounce(700, actionTypes.UPDATE_SEARCH_VALUE, getContactsSaga);
  yield takeLatest(actionTypes.ADD_CONTACT, addContactSaga);
  yield takeLatest(actionTypes.EDIT_CONTACT_SEND, editContactSendSaga);
};
