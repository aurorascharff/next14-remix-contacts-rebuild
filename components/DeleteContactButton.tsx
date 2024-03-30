'use client';

import React, { useTransition } from 'react';
import { deleteContact } from '../lib/actions/deleteContact';

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const deleteContactById = deleteContact.bind(null, contactId);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      data-pending={isPending ? '' : undefined}
      action={deleteContactById}
      onSubmit={() => {
        startTransition(() => {
          const response = confirm('Please confirm you want to delete this record.');
          if (!response) {
            return;
          }
          deleteContactById();
        });
      }}
    >
      <button className="text-red-400" type="submit">
        Delete
      </button>
    </form>
  );
}
