'use client';

import React, { useTransition } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  action: () => void | Promise<unknown>;
  onClick?: () => void;
};

export default function Button({ className, children, action, onClick }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={action}
      onSubmit={() => {
        startTransition(() => {
          onClick ? onClick() : action();
        });
      }}
      data-pending={isPending ? '' : undefined}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
