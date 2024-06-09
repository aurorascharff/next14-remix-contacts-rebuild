'use client';

import React from 'react';
import { updateContact } from '../lib/actions/updateContact';
import { useLoading } from '../providers/LoadingContext';
import NavButton from './NavButton';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);
  const { startTransition } = useLoading();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await updateContactById(new FormData(event.currentTarget));
    });
  };

  return (
    <form className="flex max-w-[40rem] flex-col gap-4" action={updateContactById} onSubmit={onSubmit}>
      <p className="flex">
        <span className="w-32">Name</span>
        <input
          className="mr-4 grow"
          defaultValue={contact.first || undefined}
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
        />
        <input
          className="grow"
          aria-label="Last name"
          defaultValue={contact.last || undefined}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label className="flex">
        <span className="w-32">Twitter</span>
        <input
          className="grow"
          defaultValue={contact.twitter || undefined}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label className="flex">
        <span className="w-32">Avatar URL</span>
        <input
          className="grow"
          aria-label="Avatar URL"
          defaultValue={contact.avatar || undefined}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label className="flex">
        <span className="w-32">Notes</span>
        <textarea className="grow" defaultValue={contact.notes || undefined} name="notes" rows={6} />
      </label>
      <p className="ml-32 flex gap-2">
        <button type="submit">Save</button>
        <NavButton color="black" href={`/contacts/${contact.id}`}>
          Cancel
        </NavButton>
      </p>
    </form>
  );
}
