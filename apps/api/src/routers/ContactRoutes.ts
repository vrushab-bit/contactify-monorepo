import { Router } from 'express';
import {
	createNewContact,
	deleteContactById,
	getContactByContactId,
	getContactsById,
	UpdateContactById,
} from '../controllers/ContactController';
import { requireAuth } from '@clerk/express';

const ContactRouter = Router();

ContactRouter.get('/', requireAuth(), getContactsById);
ContactRouter.post('/', requireAuth(), createNewContact);
ContactRouter.get('/:contactId', requireAuth(), getContactByContactId);
ContactRouter.put('/:contactId', requireAuth(), UpdateContactById);
ContactRouter.delete('/:contactId', requireAuth(), deleteContactById);

export default ContactRouter;
