const express = require('express');
const router = express.Router();
const {userRegister, userLogin, currentUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')

router.route("/register")
    .post(userRegister);

router.route('/login')
    .post(userLogin);

router.route('/current')
    .get(validateToken, currentUser);


module.exports = router;