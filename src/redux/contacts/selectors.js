import { createSelector } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';

export const selectContacts = state => state.contacts.items;

export const selectContactsFilter = state => state.filters.name;

export const selectLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectContactsFilter],
  (contacts, filter) => {
    if (filter === '') {
      return contacts;
    }
    const options = {
      keys: ['name', 'number'],
      includeScore: true,
    };
    const fuse = new Fuse(contacts, options);
    return fuse.search(filter).map(contact => contact.item);
  },
);

//  return contactResults.filter(
//     contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//       contact.number.includes(filter),
