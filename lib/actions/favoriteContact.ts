'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';
import { prisma } from '../../db';

export async function favoriteContact(contactId: string, formData: FormData) {
  invariant(contactId, 'Missing contactId param');
  await prisma.contact.update({
    data: {
      favorite: formData.get('favorite') === 'true',
    },
    where: {
      id: contactId,
    },
  });
  revalidatePath('/');
}
