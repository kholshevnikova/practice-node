// import {PATH_DB}   from '../constants/contacts.js';
import { createFakeContact } from "../utils/createFakeContact.js";
// import * as fs from 'node:fs/promises';
// import DetectFileEncodingAndLanguage from 'detect-file-encoding-and-language';
import getAllContacts from './getAllContacts.js';
import updateContacts from './updateContacts.js';




const generateContacts = async (number) => {

    // const {encoding} = await DetectFileEncodingAndLanguage(PATH_DB);
    const contactList = await getAllContacts();
    const newContactsList = Array(number).fill(0).map(createFakeContact);
    contactList.push(...newContactsList);
    await updateContacts(contactList);
};

generateContacts(5);
