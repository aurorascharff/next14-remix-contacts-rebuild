'use client';

import { useLoading } from '../providers/LoadingContext';

export const DetailView = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  return (
    <div id="detail" className={isLoading ? 'animate-pulse' : ''}>
      {children}
    </div>
  );
};
