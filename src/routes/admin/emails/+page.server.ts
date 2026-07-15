import { redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get(ADMIN_COOKIE);
  if (!verifyAdminToken(token)) {
    throw redirect(303, '/admin/login');
  }

  try {
    const scheduledEmailsCollection = await getCollection(COLLECTIONS.SCHEDULED_EMAILS);
    const emails = await scheduledEmailsCollection.find({}).sort({ createdAt: -1 }).toArray();

    // Serialize _id object to string for the client
    const serializedEmails = emails.map(email => {
      const { _id, ...rest } = email;
      return {
        id: _id.toString(),
        ...rest
      };
    });

    return {
      emails: serializedEmails
    };
  } catch (err) {
    console.error('Erreur chargement historique emails:', err);
    return {
      emails: []
    };
  }
};
