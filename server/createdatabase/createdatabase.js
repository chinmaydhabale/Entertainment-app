const moviedata = require('../Data/moviedata')
const moviemodel = require('../Models/Moviesmodel')
const tvseriesdata = require('../Data/TVseries')
const tvseriesmodel = require('../Models/Tvseriesmodel')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

// Connect to MongoDB database
const DATABASE_URL = `${process.env.MONGO_URL}`;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

// Function to create movie database
const createmoviedatabase = async () => {
    await moviemodel.deleteMany({})
    await moviemodel.insertMany(moviedata)
    console.log('success')
}

// Function to create TV series database
const createtvseriesdatabase = async () => {
    await tvseriesmodel.deleteMany({})
    await tvseriesmodel.insertMany(tvseriesdata)
    await mongoose.disconnect();
    console.log('success')
}

// Create movie database
createmoviedatabase()

// Create TV series database
createtvseriesdatabase()
