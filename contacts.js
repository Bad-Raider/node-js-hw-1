const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");


async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(data);
    return allContacts;
};


async function getContactById(contactId) {
  const stringId = String(contactId); 
    const allContacts = await listContacts();
  const contact = allContacts.find(c => c.id === stringId);
    return contact || null;
};


async function removeContact(contactId) {
  const stringId = String(contactId); 
  const arr = await listContacts();
  const index = arr.findIndex(el => el.id === stringId);
  if (index === -1) {
    return null
  };   
  const removedElement = arr.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2))
    return removedElement;
}


const addContact = async(name, email, phone) => {
    const data = await listContacts();
    const contact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone, 
    }
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return contact;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};