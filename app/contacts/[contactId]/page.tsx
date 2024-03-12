import type { ContactRecord } from '../../../data';
import type { FunctionComponent } from 'react';

export default function Contact() {
  const contact = {
    avatar: 'https://placekitten.com/g/200/200',
    favorite: true,
    first: 'Your',
    last: 'Name',
    notes: 'Some notes',
    twitter: 'your_handle',
  };

  return (
    <div id="contact">
      <div>
        <img alt={`${contact.first} ${contact.last} avatar`} key={contact.avatar} src={contact.avatar} />
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
          <form action="edit">
            <button type="submit">Edit</button>
          </form>

          <form>
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, 'favorite'>;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
    <form>
      <button
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </form>
  );
};
