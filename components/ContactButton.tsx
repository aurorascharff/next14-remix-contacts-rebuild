'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useLoading } from '@/providers/LoadingContext';
import { cn } from '@/utils/style';
import type { Contact } from '@prisma/client';

export default function ContactButton({ contact }: { contact: Contact }) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);
  const { startTransition } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Link
      className={cn(
        isActive ? 'active' : 'hover:bg-gray',
        isLoading ? 'pending' : '',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 text-black no-underline',
      )}
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
      {contact.favorite ? (
        <span className={cn('float-right', isActive ? 'text-white' : 'text-secondary')}>★</span>
      ) : null}
    </Link>
  );
}
