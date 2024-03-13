'use client';

import React, { useTransition } from 'react';
import { deleteContact } from '../lib/actions/deleteContact';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="text-red-400"
      data-pending={isPending ? '' : undefined}
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(() => {
          deleteContact(contactId);
        });
      }}
    >
      Delete
    </button>
  );
}
