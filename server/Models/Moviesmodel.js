const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    rank: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    genre: {
        type: [String]
    },
    thumbnail: {
        type: String
    },
    rating: {
        type: String
    },
    year: {
        type: String
    },
    imdbid: {
        type: String
    },
    imdb_link: {
        type: String
    },
    big_image: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: String,
        default: "movie"
    }
})

const MovieModel = mongoose.model("movies", MovieSchema)

module.exports = MovieModel;

