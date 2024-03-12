import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getContacts } from '../data';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next 14 rebuild of Remix Contacts',
  title: 'Next Contacts',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contacts = await getContacts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="sidebar">
          <h1>Next Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input aria-label="Search contacts" id="q" name="q" placeholder="Search" type="search" />
              <div aria-hidden hidden={true} id="search-spinner" />
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map(contact => {
                  return (
                    <li key={contact.id}>
                      <Link href={`contacts/${contact.id}`}>
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{' '}
                        {contact.favorite ? <span>★</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
