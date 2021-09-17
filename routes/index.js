const express = require('express')
const User = require('../models/User')
const router = express.Router()
const axios = require('axios');

router.get('/', (req, res) => {
    res.redirect('/login')
});

module.exports = router