const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: Array,
        required: false
    },
    media: {
        type: Array,
        required: true
    },
    roles: {
        type: Array,
        required: false
    }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;