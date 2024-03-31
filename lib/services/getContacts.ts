import 'server-only';

import { notFound } from 'next/navigation';
import { prisma } from '../../db';

export async function getContacts() {
  const contact = await prisma.contact.findMany();
  if (!contact) {
    notFound();
  }
  return contact;
}
