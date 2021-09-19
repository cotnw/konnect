const express = require("express");
const User = require("../models/User");
const Project = require("../models/Project");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/dashboard");
});

router.get("/register", async(req, res) => {
    res.render("register");
});

router.get("/registered", async(req, res) => {
    res.render("registered");
});

router.post("/register", async(req, res) => {
    let user = await User.findOne({ access_token: req.query.access_token });
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

router.get("/dashboard", async(req, res) => {
    let projects = await Project.find({})
    for (i = 0; i < projects.length; i++) {
        let user = await User.findOne({ access_token: projects[i].access_token });
        projects[i].user = user;
    }
    res.render("dashboard", {
        projects: projects,
    });
});

router.get("/create", (req, res) => {
    res.render("createProject");
});

router.post("/create", async(req, res) => {
    console.log(req.body.roles);
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        roles: req.body.roles,
        links: req.body.links,
        media: req.body.media,
        access_token: req.query.access_token,
    });
    await project.save();
    res.json({ success: true, message: "Project created." });
});

router.get("/project", (req, res) => {
    res.render("project");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/pfp", async(req, res) => {
    let user = await User.findOne({ access_token: req.query.access_token });
    if (user) {
        res.redirect(user.pfp_url)
    } else {
        res.sendStatus(404);
    }
})

module.exports = router;