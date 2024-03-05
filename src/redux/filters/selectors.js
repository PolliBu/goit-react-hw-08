import { createSelector } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
import { selectContacts } from '../contacts/selectors';

export const selectContactsFilter = state => state.filters.name;

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
