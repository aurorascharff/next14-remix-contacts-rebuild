'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { cn } from '../utils/style';
import type { ContactRecord } from '../data';

type Props = {
  contact: ContactRecord;
};

export default function ContactButton({ contact }: Props) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      data-pending={isPending ? '' : undefined}
      className={cn(isActive && 'active', isPending && 'pending')}
      href={`/contacts/${contact.id}`}
      onClick={e => {
        e.preventDefault();
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
    </Link>
  );
}
