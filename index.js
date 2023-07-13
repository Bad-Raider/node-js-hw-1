const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const {
    listContacts,
    getContactById,
    removeContact, 
    addContact,
} = require("./contacts");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
       console.table(allContacts);
      break;

    case 'get':
      const contact = await getContactById(id);
       console.log(contact);
      break;

    case 'add':
      const add = await addContact(name, email, phone);
      console.log(add);
      break;

    case 'remove':
      const rem = await removeContact(id)
          console.log(rem);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}


const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);

