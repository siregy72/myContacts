const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const getLogin = asyncHandler(async (req, res) => {
  res.render('home');
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user) {
    return res.json( { message: 'Login failed' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    return res.json( { message: 'Login failed' });
  }

  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/contacts');
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