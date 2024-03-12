import CancelButton from '../../../../components/CancelButton';
import { updateContact } from '../../../../lib/actions/updateContact';
import { getContact } from '../../../../lib/services/getContact';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function EditContactPage({ params }: PageProps) {
  const contact = await getContact(params.contactId);
  const updateContactById = updateContact.bind(null, params.contactId);

  return (
    <form action={updateContactById} key={contact.id} id="contact-form">
      <p>
        <span>Name</span>
        <input defaultValue={contact.first} aria-label="First name" name="first" type="text" placeholder="First" />
        <input aria-label="Last name" defaultValue={contact.last} name="last" placeholder="Last" type="text" />
      </p>
      <label>
        <span>Twitter</span>
        <input defaultValue={contact.twitter} name="twitter" placeholder="@jack" type="text" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <CancelButton />
      </p>
    </form>
  );
}
