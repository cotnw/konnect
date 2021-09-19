const express = require("express");
const User = require("../models/User");
const Project = require("../models/Project");
const Application = require("../models/Application");
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
    let users = await User.find({});
    let projects = await Project.find({});
    for (i = 0; i < projects.length; i++) {
        let user = await User.findOne({
            access_token: projects[i].access_token,
        });
        projects[i].user = user;
    }
    res.render("dashboard", {
        projects: projects,
        users: users
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

router.get("/project/:id", async(req, res) => {
    let author = false
    let project = await Project.findOne({ _id: req.params.id });
    let user = await User.findOne({ access_token: project.access_token });
    if (project.access_token === req.cookies.access_token) {
        author = true
    }
    res.render("project", { project: project, user: user, author: author });
});

router.get('/project/:id/members/:index/remove', async(req, res) => {
    let project = await Project.findOne({ _id: req.params.id });
    if (req.cookies.access_token == project.access_token) {
        project.members.splice(req.params.index, 1)
        await Project.findOneAndUpdate({ _id: req.params.id }, { members: project.members });
        res.redirect(`/project/${req.params.id}/admin`)
    } else {
        res.json({ success: false, message: "You do not have permission to remove this member." });
    }
});

router.get("/project/:id/admin", async(req, res) => {
    let applications = await Application.find({ project_id: req.params.id })
    let project = await Project.findOne({ _id: req.params.id });
    for (let j = 0; j < project.members.length; j++) {
        let user = await User.findOne({ _id: project.members[j].member_id });
        project.members[j].user = user;
    }
    for (let i = 0; i < applications.length; i++) {
        let user = await User.findOne({ access_token: applications[i].access_token });
        applications[i].user = user;
    }
    res.render("admin", { applications: applications, project: project });
});

router.post("/project/:id/apply", async(req, res) => {
    const body = req.body;

    let application = new Application({
        access_token: req.cookies["access_token"],
        project_id: req.params.id,
        role: {
            name: body.role,
            desc: body.desc,
        },
        role_id: body.role_id
    });

    try {
        await application.save();
        res.redirect("/dashboard");
    } catch (err) {
        res.json({ err: "error" });
    }
});

router.get("/joinedprojects", async(req, res) => {
    let user = await User.findOne({ access_token: req.cookies.access_token });
    let projects = await Project.find({ members: { $elemMatch: { member_id: user._id } } });
    for (i = 0; i < projects.length; i++) {
        let user = await User.findOne({
            access_token: projects[i].access_token,
        });
        projects[i].user = user;
    }
    res.render("myProjects", { projects });
});

router.get("/projects", async(req, res) => {
    let projects = await Project.find({ access_token: req.cookies.access_token });
    for (i = 0; i < projects.length; i++) {
        let user = await User.findOne({
            access_token: projects[i].access_token,
        });
        projects[i].user = user;
    }
    res.render("myProjects", { projects });
});

router.get("/profile", async(req, res) => {
    let user = await User.findOne({ access_token: req.cookies.access_token });
    res.render("profile", { user: user, profile: true });
});

router.get("/admin", (req, res) => {
    res.render("admin");
});

router.get("/view", (req, res) => {
    res.render("viewProject");
});

router.get("/pfp", async(req, res) => {
    let user = await User.findOne({ access_token: req.query.access_token });
    if (user) {
        res.redirect(user.pfp_url);
    } else {
        res.sendStatus(404);
    }
});

router.get('/user/:id', async(req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    res.render("profile", { user: user, profile: false });
})

router.get('/application/:id/accept', async(req, res) => {
    let application = await Application.findOne({ _id: req.params.id });
    let user = await User.findOne({ access_token: application.access_token });
    let project = await Project.findOne({ _id: application.project_id });
    if (req.cookies.access_token == project.access_token) {
        project.members.push({
            member_id: user._id,
            role: application.role
        });
        await Project.findOneAndUpdate({ _id: application.project_id }, { members: project.members });
        await Application.findOneAndDelete({ _id: req.params.id });
        res.redirect(`/project/${application.project_id}/admin`)
    } else {
        res.json({ success: false, message: "Access Token invalid." });
    }
})

module.exports = router;