const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pfp_url: {
        type: String,
        required: true
    },
    google_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    portfolio: {
        type: Array,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    contact_email: {
        type: String,
        required: false
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;