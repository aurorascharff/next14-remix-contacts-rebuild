'use client';

import React, { useTransition } from 'react';
import { deleteContact } from '../lib/actions/deleteContact';
import { updateContact } from '../lib/actions/updateContact';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const [isPending, startTransition] = useTransition();
  const updateContactById = updateContact.bind(null, contactId);

  return (
    <form
      data-pending={isPending ? '' : undefined}
      action={updateContactById}
      onSubmit={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(() => {
          deleteContact(contactId);
        });
      }}
    >
      <button className="text-red-400" type="submit">
        Delete
      </button>
    </form>
  );
}
