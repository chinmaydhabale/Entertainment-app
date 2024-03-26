const mongoose = require('mongoose')


const useSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    bookmarkmovie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
    bookmarkseries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tvseries' }],
}, { timestamps: true })




const usermodel = mongoose.model("User", useSchema);

module.exports = usermodel;