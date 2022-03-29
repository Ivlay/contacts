import actionTypes from './action-type';
import { Contact, SearchParams } from './types';

const contactsActionCreators = {
  getContacts: () => ({
    type: actionTypes.GET_CONTACTS,
  }),
  getContactsSuccess: (payload: Contact[]) => ({
    type: actionTypes.GET_CONTACTS_SUCCESS,
    payload,
  }),
  getContactsFailure: (payload: unknown) => ({
    type: actionTypes.GET_CONTACTS_FAILURE,
    payload,
  }),

  removeContact: (payload: string) => ({
    type: actionTypes.REMOVE_CONTACT,
    payload,
  }),
  removeContactSuccess: (payload: string) => ({
    type: actionTypes.REMOVE_CONTACT_SUCCESS,
    payload,
  }),
  removeContactFailure: (payload: unknown) => ({
    type: actionTypes.REMOVE_CONTACT_FAILURE,
    payload,
  }),

  addContact: (payload: Contact) => ({
    type: actionTypes.ADD_CONTACT,
    payload,
  }),
  addContactSuccess: (payload: Contact) => ({
    type: actionTypes.ADD_CONTACT_SUCCESS,
    payload,
  }),
  addContactFailure: (payload: unknown) => ({
    type: actionTypes.ADD_CONTACT_FAILURE,
    payload,
  }),

  editContact: (payload: Contact) => ({
    type: actionTypes.EDIT_CONTACT_START,
    payload,
  }),
  editContactSend: (payload: Contact) => ({
    type: actionTypes.EDIT_CONTACT_SEND,
    payload,
  }),
  editContactReset: () => ({
    type: actionTypes.EDIT_CONTACT_RESET,
  }),
  editContactSuccess: (payload: Contact) => ({
    type: actionTypes.EDIT_CONTACT_SUCCESS,
    payload,
  }),
  editContactFailure: (payload: unknown) => ({
    type: actionTypes.EDIT_CONTACT_FAILURE,
    payload,
  }),

  updateSearchParams: (payload: Partial<SearchParams>) => ({
    type: actionTypes.UPDATE_SEARCH_PARAMS,
    payload,
  }),

  updateTotal: (payload: number) => ({
    type: actionTypes.UPDATE_TOTAL,
    payload,
  }),

  updateSearchValue: (payload: string) => ({
    type: actionTypes.UPDATE_SEARCH_VALUE,
    payload,
  })
};

export default contactsActionCreators;
