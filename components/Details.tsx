'use client';

import { useLoading } from '../providers/LoadingContext';
import { cn } from '../utils/style';

export const Details = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  return <div className={cn(isLoading && 'loading', 'w-full flex-1 px-16 py-8')}>{children}</div>;
};
