const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId.toString());
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    console.log(newContact);
    const newContacts = JSON.stringify([...contacts, newContact], null, 2);
    await fs.writeFile(contactsPath, newContacts);
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId.toString());
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    console.log(result);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
