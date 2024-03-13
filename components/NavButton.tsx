'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

type Props = {
  children: React.ReactNode;
  href?: string;
};

export default function NavButton({ children, href }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      data-pending={isPending ? '' : undefined}
      type="button"
      onClick={() => {
        startTransition(() => {
          href ? router.push(href) : router.back();
        });
      }}
    >
      {children}
    </button>
  );
}
