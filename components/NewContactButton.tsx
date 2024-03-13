'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '../lib/actions/createEmptyContact';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={createEmptyContact}
      onSubmit={() => {
        startTransition(() => {
          createEmptyContact();
        });
      }}
      data-pending={isPending ? '' : undefined}
    >
      <button className="bg-white" type="submit">
        New
      </button>
    </form>
  );
}
