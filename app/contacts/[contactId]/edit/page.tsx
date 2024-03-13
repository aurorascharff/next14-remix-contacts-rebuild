import SaveContactForm from '../../../../components/SaveContactForm';
import { getContact } from '../../../../lib/services/getContact';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function EditContactPage({ params }: PageProps) {
  const contact = await getContact(params.contactId);

  return <SaveContactForm contact={contact} />;
}
