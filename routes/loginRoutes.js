const express = require('express');
const router = express.Router();
const { getLogin, loginUser, getRegister, reegisterUser, } = require('../controllers/loginController');

router.route('/').get(getLogin).post(loginUser);
router.route('/register').get(getRegister).post(reegisterUser);

module.exports = router;