'use client';

import React, { useOptimistic, useTransition } from 'react';
import { favoriteContact } from '../lib/actions/favoriteContact';
import { cn } from '../utils/style';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(favorite);
  const favoriteContactById = favoriteContact.bind(null, contact.id, favorite);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      addOptimisticFavorite(!optimisticFavorite);
      if (isPending) return;
      await favoriteContactById();
    });
  };

  return (
    <form action={favoriteContactById} onSubmit={onSubmit}>
      <button
        type="submit"
        className={cn(
          optimisticFavorite ? 'text-secondary' : 'text-gray-400',
          'm-0 p-0 text-2xl shadow-none hover:text-secondary hover:shadow-none',
        )}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {optimisticFavorite ? '★' : '☆'}
      </button>
    </form>
  );
}
