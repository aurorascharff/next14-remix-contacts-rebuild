'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
import { deleteContact as deleteContactFakeDb } from '../../data';

export async function deleteContact(contactId: string) {
  invariant(contactId, 'Missing contactId param');
  await deleteContactFakeDb(contactId);
  revalidatePath('/');
  redirect('/');
}
