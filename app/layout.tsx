import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import ContactList from '../components/ContactList';
import Search from '../components/Search';
import { getContacts } from '../data';
import { createEmptyContact } from '../lib/actions/createEmptyContact';
import { cn } from '../utils/style';
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
      <body className={cn(inter.className, 'group')}>
        <div id="sidebar">
          <h1>Next Contacts</h1>
          <Suspense fallback="Loading...">
            <div>
              <Search />
              <form action={createEmptyContact}>
                <button className="bg-white" type="submit">
                  New
                </button>
              </form>
            </div>
            <ContactList contacts={contacts} />
          </Suspense>
        </div>
        <div className="has-[[data-pending]]:animate-pulse group-has-[[data-pending]]:animate-pulse" id="detail">
          {children}
        </div>
      </body>
    </html>
  );
}
