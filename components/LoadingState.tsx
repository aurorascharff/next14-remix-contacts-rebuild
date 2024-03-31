'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useTransition } from 'react';

type LoadingStateContextType = {
  isLoading: boolean;
  start: (_action: any) => void;
};

export const LoadingStateContext = createContext<LoadingStateContextType | undefined>(undefined);

export default function LoadingState({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  const start = async (action: any) => {
    startTransition(async () => {
      action();
    });
  };

  return (
    <LoadingStateContext.Provider value={{ isLoading: isPending, start }}>{children}</LoadingStateContext.Provider>
  );
}

export function useLoading() {
  const context = React.useContext(LoadingStateContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
}

export const LoadingDisplay = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();
  return <div className={isLoading ? 'animate-pulse' : ''}>{children}</div>;
};
