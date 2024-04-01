'use client';

import React from 'react';
import { useLoading } from '../providers/LoadingContext';

type Props = {
  action: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function ActionButton({ action, onClick, children, className }: Props) {
  const { startTransition } = useLoading();

  return (
    <form
      action={action}
      onSubmit={e => {
        e.preventDefault();
        startTransition(() => {
          onClick ? onClick() : action();
        });
      }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
