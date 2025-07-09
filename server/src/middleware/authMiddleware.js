const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = (req, res, next) => next();
const admin = (req, res, next) => next();
const business = (req, res, next) => next();

module.exports = { protect, admin, business };
