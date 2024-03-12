'use client';

import React from 'react';
import { deleteContact } from '../lib/actions/deleteContact';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  return (
    <button
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        deleteContact(contactId);
      }}
    >
      Delete
    </button>
  );
}
