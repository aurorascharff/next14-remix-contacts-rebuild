'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { cn } from '../utils/style';
import { useLoading } from './LoadingState';
import type { ContactRecord } from '../data';

type Props = {
  contact: ContactRecord;
};

export default function ContactButton({ contact }: Props) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);
  const { start } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Link
      className={cn(isActive && 'active', isLoading && 'pending')}
      href={`/contacts/${contact.id}`}
      onClick={e => {
        e.preventDefault();
        setIsLoading(true);
        start(() => {
          router.push(`/contacts/${contact.id}`);
          setIsLoading(false);
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
