'use client';

import React from 'react';
import { useLoading } from './LoadingState';

type Props = {
  action: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function ActionButton({ action, onClick, children, className }: Props) {
  const { start } = useLoading();

  return (
    <form
      action={action}
      onSubmit={e => {
        e.preventDefault();
        start(() => {
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
