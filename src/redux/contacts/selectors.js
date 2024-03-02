import { createSelector } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';

export const selectContacts = state => state.contacts.items;

export const selectContactsFilter = state => state.filters.name;

export const selectLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectContactsFilter],
  (contacts, filter) => {
    const fuse = new Fuse(contacts, {
      keys: ['name', 'number'],
      includeScore: true,
    });
    const results = fuse.search('j');
    const contactResults = results.map(result => result.item);
    return contactResults.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter),
    );
  },
);
