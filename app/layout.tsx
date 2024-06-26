import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ActionButton from '@/components/ActionButton';
import ContactList from '@/components/ContactList';
import { Details } from '@/components/Details';
import Search from '@/components/Search';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import { getContacts } from '@/lib/services/getContacts';
import LoadingProvider from '@/providers/LoadingProvider';
import Logo from '@/public/next-js.svg';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 14 rebuild of Remix Contacts',
  title: 'Next Contacts',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contacts = await getContacts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <div className="flex w-[22rem] flex-col border-r border-gray bg-gray-background">
            <Suspense>
              <div className="flex items-center gap-2 border-b border-gray px-8 py-4">
                <Search />
                <ActionButton className="bg-white" action={createEmptyContact}>
                  New
                </ActionButton>
              </div>
              <ContactList contacts={contacts} />
            </Suspense>
            <div className="m-0 flex flex-row items-center gap-2 border-t border-t-gray px-8 py-4 font-medium">
              <Image width={30} height={30} src={Logo} alt="" />
              <Link className="text-black no-underline" href="/">
                Next Contacts
              </Link>
            </div>
          </div>
          <Details>{children}</Details>
        </LoadingProvider>
      </body>
    </html>
  );
}
