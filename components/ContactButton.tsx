'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import type { ContactRecord } from '../data';

type Props = {
  contact: ContactRecord;
};

export default function ContactButton({ contact }: Props) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${contact.id}`);

  return (
    <Link className={isActive ? 'active' : ''} href={`/contacts/${contact.id}`}>
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
