'use client';

import React from 'react';
import { deleteContact } from '../lib/actions/deleteContact';
import TransitionButton from './TransitionButton';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <TransitionButton
      className="text-red-400"
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        deleteContactById();
      }}
      action={deleteContactById}
    >
      Delete
    </TransitionButton>
  );
}
