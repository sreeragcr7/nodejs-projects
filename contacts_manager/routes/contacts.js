const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken')
const {getContacts, createContacts, updateContact, deleteContact, getOneContact} = require('../controllers/contactsController')

router.use(validateToken);
router.route('/')
    .get(getContacts)
    .post(createContacts);

router.route('/:id')
    .get(getOneContact)
    .put(updateContact)
    .delete(deleteContact);
        
module.exports = router;