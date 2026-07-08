import Contact from "../models/Contact.js";
import logger from "../utils/logger.js";

export const createContact = async (data) => {
  const contact = await Contact.create(data);
  logger.info(`New contact message from: ${data.email}`);
  return contact;
};

export const getContacts = async ({ page = 1, limit = 20, sort = "-createdAt" } = {}) => {
  const skip = (page - 1) * limit;
  const [contacts, total] = await Promise.all([
    Contact.find().sort(sort).skip(skip).limit(limit).lean(),
    Contact.countDocuments(),
  ]);

  return {
    contacts,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};
