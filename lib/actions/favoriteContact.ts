'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';
import { updateContact as updateContactFakeDb } from '../../data';

export async function favoriteContact(contactId: string, formData: FormData) {
  invariant(contactId, 'Missing contactId param');
  await updateContactFakeDb(contactId, {
    favorite: formData.get('favorite') === 'true',
  });
  revalidatePath('/');
}
