import Image from 'next/image';
import { getContact } from '@/lib/services/getContact';
import DeleteContactButton from '../../../components/DeleteContactButton';
import Favorite from '../../../components/Favorite';
import NavButton from '../../../components/NavButton';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function ContactPage({ params }: PageProps) {
  const contactId = decodeURIComponent(params.contactId);
  const contact = await getContact(contactId);

  return (
    <div className="flex max-w-[40rem]">
      <div>
        {contact.avatar && (
          <Image
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray-background object-cover"
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        )}
      </div>

      <div>
        <h1 className="flex-start flex gap-4 text-3xl font-bold">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p className="text-2xl text-primary">
            <a className="text-primary no-underline hover:underline" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div className="my-4 flex gap-2">
          <NavButton href={`/contacts/${contactId}/edit`}>Edit</NavButton>
          <DeleteContactButton contactId={contactId} />
        </div>
      </div>
    </div>
  );
}
