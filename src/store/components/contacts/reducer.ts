import produce from 'immer';

import { Contact, SearchParams } from './types';

import actiontypes from './action-type';

interface ContactState {
  isFetching: boolean;
  error: string | null;
  searchValue: string;
  data: Contact[];
  searchParams: SearchParams;
  total?: number;
  editValue?: Contact | null;
}

export const initialState: ContactState = {
  isFetching: false,
  error: null,
  searchValue: '',
  searchParams: {
    _page: 1,
    _order: 'desc',
    _sort: 'age',
  },
  data: [],
  editValue: null,
  total: 0,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actiontypes.GET_CONTACTS:
      draft.error = initialState.error;
      draft.isFetching = true;
      return draft;
    case actiontypes.GET_CONTACTS_SUCCESS:
      draft.data = action.payload;
      draft.isFetching = false;
      return draft;
    case actiontypes.GET_CONTACTS_FAILURE:
      draft.error = action.payload;
      draft.isFetching = false;
      return draft;
    case actiontypes.REMOVE_CONTACT:
      draft.isFetching = true;
      draft.error = initialState.error;
      return draft;
    case actiontypes.REMOVE_CONTACT_SUCCESS:
      draft.isFetching = false;
      draft.data = draft.data.filter((contact) => contact.id !== action.payload);
      return draft;
    case actiontypes.UPDATE_TOTAL:
      draft.total = action.payload;
      return draft;
    case actiontypes.ADD_CONTACT:
      draft.error = initialState.error;
      draft.isFetching = true;
      return draft;
    case actiontypes.ADD_CONTACT_SUCCESS:
      draft.data = draft.data.concat(action.payload);
      draft.isFetching = false;
      return draft;
    case actiontypes.ADD_CONTACT_FAILURE:
      draft.error = action.payload;
      draft.isFetching = false;
      return draft;
    case actiontypes.EDIT_CONTACT_START:
      draft.editValue = action.payload;
      return draft;
    case actiontypes.EDIT_CONTACT_SUCCESS:
      const indexContact = draft.data.findIndex((contact) => contact.id === action.payload.id);

      if (indexContact !== -1) {
        draft.data[indexContact] = action.payload;
      };
      return draft;
    case actiontypes.EDIT_CONTACT_RESET:
      draft.editValue = initialState.editValue;
      return draft;
    case actiontypes.UPDATE_SEARCH_PARAMS:
      draft.searchParams = {...draft.searchParams, ...action.payload}
    return draft;
    case actiontypes.UPDATE_SEARCH_VALUE:
      draft.searchValue = action.payload;
      return draft;
    default:
      return draft;
  }
}, initialState);

export default reducer;
