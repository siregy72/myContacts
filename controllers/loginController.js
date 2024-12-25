const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getLogin = asyncHandler(async (req, res) => {
  res.render('home');
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.send('Login success');
  } else {
    res.send('login failed');
  }
});

const getRegister = asyncHandler(async (req, res) => {
  res.render('register');
});

const reegisterUser = asyncHandler(async (req, res) => {
  const { username, password, password2 } = req.body;
  if(password === password2) {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashPassword });
    res.json( { message: 'Register success', user });
  } else{
    res.send('Register failed');
  }
});

module.exports = {
    getLogin,
    loginUser,
    getRegister,
    reegisterUser,
};