import ContactForm from '../../../../components/ContactForm';
import { getContact } from '../../../../lib/services/getContact';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function EditContactPage({ params }: PageProps) {
  const contactId = decodeURIComponent(params.contactId);
  const contact = await getContact(contactId);

  return <ContactForm contact={contact} />;
}
