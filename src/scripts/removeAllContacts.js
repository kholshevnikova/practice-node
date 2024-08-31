// import { PATH_DB } from '../constants/contacts.js';

import updateContacts from "./updateContacts.js";


export const removeAllContacts = async () => {
    await updateContacts([]);
};

removeAllContacts();
