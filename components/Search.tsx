'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import { cn } from '@/utils/style';

export default function Search() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isPending, startTransition] = useTransition();
  const searching = isPending && query;

  return (
    <form role="search">
      <input
        className={cn(!searching && 'search-icon', 'w-full pl-8 outline-offset-1')}
        onChange={e => {
          const isFirstSearch = query === null;
          startTransition(() => {
            isFirstSearch
              ? router.push(`${pathName}?q=${e.target.value}`)
              : router.replace(`${pathName}?q=${e.target.value}`);
          });
        }}
        defaultValue={query}
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <div aria-hidden hidden={!searching} className="search-spinner absolute left-10 top-7 h-4 w-4 animate-spin" />
    </form>
  );
}
