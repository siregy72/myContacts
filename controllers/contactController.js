const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.render("index", { contacts: contacts });
});
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone }  = req.body;
    if(!name || !email || !phone){
        return res.send("필수값이 입력되지 않았습니다.");
    }

    const contact = await Contact.create({
        name, 
        email, 
        phone,
    });
    res.send("Create Contacts");
});
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.send(contact);
});
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    contact.save();

    res.json(contact);
});
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();
    res.send("Deleted");
});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};