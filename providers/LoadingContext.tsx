'use client';

import React, { createContext, useTransition } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  startTransition: (_action: () => Promise<void>) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export default function LoadingStateProvider({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  const start = async (action: () => Promise<void>) => {
    startTransition(async () => {
      await action();
    });
  };

  return (
    <LoadingContext.Provider value={{ isLoading: isPending, startTransition: start }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
}
