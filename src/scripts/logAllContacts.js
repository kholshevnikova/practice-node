import getAllContacts from "./getAllContacts.js";

const logAllContacts = async () => {
    const contacts = await getAllContacts();
    console.log(contacts);
};

logAllContacts();
