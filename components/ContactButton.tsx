'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useLoading } from '../providers/LoadingContext';
import { cn } from '../utils/style';
import type { Contact } from '@prisma/client';

type Props = {
  contact: Contact;
};

export default function ContactButton({ contact }: Props) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);
  const { startTransition } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Link
      className={cn(isActive && 'active', isLoading && 'pending')}
      href={`/contacts/${contact.id}`}
      onClick={e => {
        e.preventDefault();
        setIsLoading(true);
        startTransition(() => {
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
