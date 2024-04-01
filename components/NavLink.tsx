'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLoading } from '../providers/LoadingContext';

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function NavLink({ children, href, className }: Props) {
  const router = useRouter();
  const { startTransition } = useLoading();

  return (
    <Link
      href={href}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          router.push(href);
        });
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
