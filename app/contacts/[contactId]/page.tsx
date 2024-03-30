import Image from 'next/image';
import DeleteContactButton from '../../../components/DeleteContactButton';
import Favorite from '../../../components/Favorite';
import NavLink from '../../../components/NavLink';
import { getContact } from '../../../lib/services/getContact';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function ContactPage({ params }: PageProps) {
  const contact = await getContact(params.contactId);

  return (
    <div id="contact">
      <div>
        {contact.avatar && (
          <Image
            width={200}
            height={200}
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        )}
      </div>

      <div>
        <h1>
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
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>{contact.twitter}</a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <NavLink className="nav-button" href={`/contacts/${contact.id}/edit`}>
            Edit
          </NavLink>
          <DeleteContactButton contactId={contact.id} />
        </div>
      </div>
    </div>
  );
}
