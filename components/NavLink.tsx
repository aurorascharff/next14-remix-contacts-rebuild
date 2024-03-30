'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function NavLink({ children, href, className }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
      data-pending={isPending ? '' : undefined}
    >
      {children}
    </Link>
  );
}
