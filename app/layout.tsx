import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import ActionButton from '../components/ActionButton';
import ContactList from '../components/ContactList';
import LoadingState, { LoadingDisplay } from '../components/LoadingState';
import Search from '../components/Search';
import { getContacts } from '../data';
import { createEmptyContact } from '../lib/actions/createEmptyContact';
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
        <LoadingState>
          <div id="sidebar">
            <h1>Next Contacts</h1>
            <Suspense>
              <div>
                <Search />
                <ActionButton className="bg-white" action={createEmptyContact}>
                  New
                </ActionButton>
              </div>
              <ContactList contacts={contacts} />
            </Suspense>
          </div>
          <LoadingDisplay>
            <div id="detail">{children}</div>
          </LoadingDisplay>
        </LoadingState>
      </body>
    </html>
  );
}
