'use client';

import React, { useOptimistic, useTransition } from 'react';
import { favoriteContact } from '../lib/actions/favoriteContact';
import type { ContactRecord } from '../data';

export default function Favorite({ contact }: { contact: ContactRecord }) {
  const favorite = contact.favorite;
  const favoriteContactById = favoriteContact.bind(null, contact.id);
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(favorite);
  const [, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      addOptimisticFavorite(!favorite);
      await favoriteContactById(new FormData(event.currentTarget));
    });
  };

  return (
    <form action={favoriteContactById} onSubmit={onSubmit}>
      <button
        className={optimisticFavorite ? 'text-yellow-400' : 'text-gray-400'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {optimisticFavorite ? '★' : '☆'}
      </button>
      <input type="hidden" name="favorite" value={favorite ? 'false' : 'true'} />
    </form>
  );
}
