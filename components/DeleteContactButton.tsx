'use client';

import React from 'react';
import { deleteContact } from '../lib/actions/deleteContact';
import Button from './Button';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <Button
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
    </Button>
  );
}
