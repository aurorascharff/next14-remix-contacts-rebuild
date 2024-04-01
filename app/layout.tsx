import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Suspense } from 'react';
import ActionButton from '../components/ActionButton';
import ContactList from '../components/ContactList';
import { Details } from '../components/Details';
import Search from '../components/Search';
import { createEmptyContact } from '../lib/actions/createEmptyContact';
import { getContacts } from '../lib/services/getContacts';
import LoadingStateProvider from '../providers/LoadingContext';
import Logo from '../public/next-js.svg';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next 14 rebuild of Remix Contacts',
  title: 'Next Contacts',
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const contacts = await getContacts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingStateProvider>
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
              <h1>Next Contacts</h1>
            </div>
          </div>
          <Details>{children}</Details>
        </LoadingStateProvider>
      </body>
    </html>
  );
}
