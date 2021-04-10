const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function parsedContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8", (err) => {
      if (err) throw err;
    });
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const contactsList = await parsedContacts();
    console.table(contactsList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await parsedContacts();
    const contact = contactList.find((item) => item.id === contactId);
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await parsedContacts();
    const delContact = contactList.filter((item) => item.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(delContact, null, 2))
    console.table(delContact);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await parsedContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))
    console.table(newContact);
    console.log('');
    console.table(contactList)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
