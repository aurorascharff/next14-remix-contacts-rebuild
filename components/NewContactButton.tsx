'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '../lib/actions/createEmptyContact';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={createEmptyContact}
      onSubmit={e => {
        e.preventDefault();
        startTransition(() => {
          createEmptyContact();
        });
      }}
      data-pending={isPending ? '' : undefined}
    >
      <button type="submit" className="bg-white">
        New
      </button>
    </form>
  );
}
