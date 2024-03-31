'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
import { prisma } from '../../db';

export async function deleteContact(contactId: string) {
  invariant(contactId, 'Missing contactId param');
  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
  revalidatePath('/');
  redirect('/');
}
