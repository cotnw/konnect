const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },
    projectID: {
        type: String,
        required: true,
    },
    role: {
        type: Object,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
