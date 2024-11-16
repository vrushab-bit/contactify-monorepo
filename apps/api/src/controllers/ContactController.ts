//  Create new Contact
import { prisma } from '../config/db';

export const createNewContact = async (req, res) => {
	try {
		const { data, userId } = req.body;

		if (!data || !userId) {
			return res.status(400).json({ success: false, message: 'Invalid data' });
		}

		// Add the new contact to the database
		const newContact = await prisma.contact.create({
			data: {
				avatar:
					'https://avatar.iran.liara.run/public/boy?username=' +
					data.name.split(' ')[0],
				userId: userId,
				company: data.company,
				jobTitle: data.jobTitle,
				name: data.name,
				phoneNumbers: {
					create: data.phoneNumbers.map((phone) => ({
						number: phone.number,
						type: phone.type,
						isPrimary: phone.isPrimary,
					})),
				},
				emails: {
					create: data.emails.map((email) => ({
						address: email.address,
						type: email.type,
						isPrimary: email.isPrimary,
					})),
				},
			},
		});

		if (newContact) {
			return res.status(201).json({ success: true, data: newContact });
		}
		return res
			.status(500)
			.json({ success: false, message: 'Error adding contact' });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Error adding contact' });
	}
};

export const getContactsById = async (req, res) => {
	try {
		const { userId } = req.query;
		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid user id' });
		}

		// Fetch all the contacts for the user
		const contacts = await prisma.contact.findMany({
			where: {
				userId: userId,
			},
			include: {
				phoneNumbers: true,
				emails: true,
			},
		});

		if (!contacts) {
			return res
				.status(404)
				.json({ success: false, message: 'No contacts found' });
		}

		return res.status(200).json({
			success: true,
			message: 'Contacts fetched successfully',
			data: contacts,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error fetching contacts' });
	}
};

export const getContactByContactId = async (req, res) => {
	try {
		const { userId } = req.query;
		const { contactId } = req.params;

		if (!userId || !contactId) {
			return res.status(400).json({ success: false, message: 'Invalid data' });
		}

		const contact = await prisma.contact.findUnique({
			where: {
				id: contactId,
			},
			include: {
				phoneNumbers: true,
				emails: true,
			},
		});
		if (!contact) {
			return res
				.status(404)
				.json({ success: false, message: 'Contact not found' });
		}

		return res.status(200).json({ success: true, data: contact });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error fetching contact' });
	}
};

export const UpdateContactById = async (req, res) => {
	try {
		const { userId } = req.query;
		const { contactId } = req.params;
		if (!userId || !contactId) {
			return res.status(400).json({ success: false, message: 'Invalid data' });
		}

		const { data } = req.body;
		if (!data) {
			return res.status(400).json({ success: false, message: 'Invalid data' });
		}

		const newContact = await prisma.contact.update({
			where: {
				id: contactId,
				userId: userId,
			},
			data: {
				company: data.company,
				jobTitle: data.jobTitle,
				name: data.name,
				phoneNumbers: {
					deleteMany: {},
					create: data.phoneNumbers.map((phone) => ({
						number: phone.number,
						type: phone.type,
						isPrimary: phone.isPrimary,
					})),
				},
				emails: {
					deleteMany: {},
					create: data.emails.map((email) => ({
						address: email.address,
						type: email.type,
						isPrimary: email.isPrimary,
					})),
				},
			},
			include: {
				phoneNumbers: true,
				emails: true,
			},
		});

		if (!newContact) {
			return res.status(404).json({ message: 'Contact not found' });
		}
		return res.status(201).json({ success: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error updating contact' });
	}
};

export const deleteContactById = async (req, res) => {
	console.log('In Thhe Function');
	const { userId } = req.query;
	const { contactId } = req.params;
	if (!userId || !contactId) {
		return res.status(400).json({ success: false, message: 'Invalid data' });
	}
	try {
		const result = await prisma.contact.delete({
			where: {
				id: contactId,
				userId: userId,
			},
		});

		if (!result) {
			return res.status(404).json({ message: 'Contact not found' });
		}

		return res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error deleting contact' });
	}
};
