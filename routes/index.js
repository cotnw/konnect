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

module.exports = router;
