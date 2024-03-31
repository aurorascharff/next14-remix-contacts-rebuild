'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useLoading } from './LoadingState';

export default function Search() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { isLoading, start } = useLoading();
  const searching = isLoading && query;

  return (
    <form id="search-form" role="search">
      <input
        className={searching ? 'loading' : ''}
        onChange={e => {
          const isFirstSearch = query === null;
          start(() => {
            isFirstSearch
              ? router.push(`${pathName}?q=${e.target.value}`)
              : router.replace(`${pathName}?q=${e.target.value}`);
          });
        }}
        defaultValue={query}
        aria-label="Search contacts"
        id="q"
        name="q"
        placeholder="Search"
        type="search"
      />
      <div aria-hidden hidden={!searching} id="search-spinner" />
    </form>
  );
}
