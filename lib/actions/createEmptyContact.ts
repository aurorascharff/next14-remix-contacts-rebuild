'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createEmptyContact as createEmptyContactFakeDb } from '../../data';

export async function createEmptyContact() {
  const contact = await createEmptyContactFakeDb();
  revalidatePath('/');
  redirect(`/contacts/${contact.id}/edit`);
}
