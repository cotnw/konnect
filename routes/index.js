const express = require("express");
const User = require("../models/User");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.send("Landing here");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/registered", async (req, res) => {
  res.render("registered");
});

router.post("/register", async (req, res) => {
  let user = await User.findOne({ access_token: req.body.access_token });
  if (user) {
    user.skills = req.body.skills;
    user.title = req.body.title;
    user.portfolio = req.body.portfolio;
    user.about = req.body.about;
    user.contact_email = req.body.contact_email;
    await user.save();
    res.json({ success: true, message: "Register successful." });
  } else {
    res.json({ success: false, message: "Access Token invalid." });
  }
});

async function checkAuth(req, res, next) {
  const accessToken = req.query.accessToken;
  const user = await User.findOne({ access_token: accessToken });

  if (user) {
    next();
  } else {
    res.redirect("/err");
  }
}

module.exports = router;
