const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// get all contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler (async (req,res) => {
    console.log('Get Contacts request received');
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

// get perticular contacts
// @route GET /api/contacts/:id
// @access private

const getOneContact = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!")
    }
    res.status(200).json(contact);
});


// create contacts
// @route POST /api/contacts
// @access private

const createContacts = asyncHandler (async (req,res) => {
    console.log('created contact : ', req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
          res.status(404); 
          throw new Error('All fields are manditory!')
    }
    const contact  = await Contact.create({
        name,
        email, 
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
});


// update contacts
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact Not Found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('No permission to update contact!')
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(201).json(updatedContact);
    console.log('updated contact: ', req.body)

});


// delete contacts
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact Not Found!')
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('No permission to update contact!')
    }
    
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
    console.log('deleted contact: ', req.body)
});


module.exports = {getContacts, createContacts, updateContact, deleteContact, getOneContact};