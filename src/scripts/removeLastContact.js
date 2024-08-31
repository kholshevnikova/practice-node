// import { PATH_DB } from '../constants/contacts.js';
import getAllContacts from "./getAllContacts.js";
import updateContacts from "./updateContacts.js";

export const removeLastContact = async () => {
    const contactsList = await getAllContacts();
    contactsList.pop();
    await updateContacts(contactsList);
};

removeLastContact();
