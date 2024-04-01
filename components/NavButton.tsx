'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLoading } from '../providers/LoadingContext';
import { cn } from '../utils/style';

type Props = {
  children: React.ReactNode;
  href: string;
  color?: 'primary' | 'black';
};

export default function NavButton({ children, href, color = 'primary' }: Props) {
  const router = useRouter();
  const { startTransition } = useLoading();
  const colorClass = color === 'black' ? 'text-black' : 'text-primary';

  return (
    <Link
      href={href}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          router.push(href);
        });
      }}
      className={cn(
        colorClass,
        'm-0 rounded-lg border-none bg-white px-3 py-2 font-medium no-underline shadow-sm hover:shadow-md active:shadow-xs',
      )}
    >
      {children}
    </Link>
  );
}
