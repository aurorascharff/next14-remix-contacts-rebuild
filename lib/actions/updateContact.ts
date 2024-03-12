'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
import { updateContact as updateContactFakeDb } from '../../data';

export async function updateContact(contactId: string, formData: FormData) {
  invariant(contactId, 'Missing contactId param');
  const updates = Object.fromEntries(formData);
  await updateContactFakeDb(contactId, updates);
  revalidatePath(`/contacts/${contactId}`);
  redirect(`/contacts/${contactId}`);
}
