const mongoose = require('mongoose');


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database ${mongoose.connection.host} `)
    } catch (error) {
        console.log(`mongoose connect error massage ${error}`)
    }
}

module.exports = connectdb;