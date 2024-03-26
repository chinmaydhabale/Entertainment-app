const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const logger = require('morgan');
const cookieParser = require("cookie-parser");


//env config
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes')
const appdataRoutes = require('./routes/appdataRoutes')
const searchRoutes = require('./routes/searchRoutes')

//mongodb connection
connectdb();

//rest objects
const app = express();

//middlewares
app.use(cors({
    origin: process.env.FRONT_URI,
    credentials: true
}))
app.use(express.json())
app.use(logger('dev'));
app.use(cookieParser());



//routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/data', appdataRoutes)
app.use('/api/v1/data', searchRoutes)


//port

const port = process.env.PORT || 8080


//listen
app.listen(port, () => {
    console.log(`server start on port ${port}`)
})