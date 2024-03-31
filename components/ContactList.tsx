'use client';

import { matchSorter } from 'match-sorter';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ContactButton from './ContactButton';
import type { Contact } from '@prisma/client';

type Props = {
  contacts: Contact[];
};

export default function ContactList({ contacts }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredContacts = query
    ? matchSorter(contacts, query, {
        keys: ['first', 'last'],
      })
    : contacts;

  return (
    <nav>
      {filteredContacts.length ? (
        <ul>
          {filteredContacts.map(contact => {
            return (
              <li key={contact.id}>
                <ContactButton contact={contact} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
}
