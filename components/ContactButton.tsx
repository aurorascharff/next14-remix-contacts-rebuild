'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import type { ContactRecord } from '../data';

type Props = {
  contact: ContactRecord;
};

export default function ContactButton({ contact }: Props) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${contact.id}`);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      data-pending={isPending ? '' : undefined}
      className={isActive ? 'active' : isPending ? 'pending' : ''}
      onClick={() => {
        startTransition(() => {
          router.push(`/contacts/${contact.id}`);
        });
      }}
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{' '}
      {contact.favorite ? <span>★</span> : null}
    </button>
  );
}
