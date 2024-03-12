import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';
import { getContact as getContactFakeDb } from '../../data';

export async function getContact(contactId: string) {
  invariant(contactId, 'Missing contactId param');
  const contact = await getContactFakeDb(contactId);
  if (!contact) {
    notFound();
  }
  return contact;
}
