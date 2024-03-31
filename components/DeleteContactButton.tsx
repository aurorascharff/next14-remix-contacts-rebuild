'use client';

import React from 'react';
import { deleteContact } from '../lib/actions/deleteContact';
import ActionButton from './ActionButton';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <ActionButton
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        deleteContactById();
      }}
      action={deleteContactById}
      className="text-red-400"
    >
      Delete
    </ActionButton>
  );
}
