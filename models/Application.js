const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    access_token: {
        type: String,
        required: true,
    },
    project_id: {
        type: String,
        required: true,
    },
    role: {
        type: Object,
        required: true,
    },
    role_id: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now(),
    },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;