const express = require("express");
const User = require("../models/User");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    res.send("Landing here");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post('/register', async(req, res) => {
    let user = await User.findOne({ access_token: req.body.access_token })
    if (user) {
        user.skills = req.body.skills
        user.title = req.body.title
        user.portfolio = req.body.portfolio
        user.about = req.body.about
        user.contact_email = req.body.contact_email
        await user.save()
        res.json({ success: true, message: 'Register successful.' })
    } else {
        res.json({ success: false, message: 'Access Token invalid.' })
    }
})

module.exports = router;