'use client';

import Link from 'next/link';
import React, { useTransition } from 'react';
import { updateContact } from '../lib/actions/updateContact';
import type { ContactRecord } from '../data';

type Props = {
  contact: ContactRecord;
};

export default function ContactForm({ contact }: Props) {
  const [isPending, startTransition] = useTransition();
  const updateContactById = updateContact.bind(null, contact.id);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await updateContactById(new FormData(event.currentTarget));
    });
  };

  return (
    <form
      data-pending={isPending ? '' : undefined}
      action={updateContactById}
      onSubmit={onSubmit}
      key={contact.id}
      id="contact-form"
    >
      <p>
        <span>Name</span>
        <input defaultValue={contact.first} aria-label="First name" name="first" type="text" placeholder="First" />
        <input aria-label="Last name" defaultValue={contact.last} name="last" placeholder="Last" type="text" />
      </p>
      <label>
        <span>Twitter</span>
        <input defaultValue={contact.twitter} name="twitter" placeholder="@jack" type="text" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <Link className="nav-button" href={`/contacts/${contact.id}`}>
          Cancel
        </Link>
      </p>
    </form>
  );
}
