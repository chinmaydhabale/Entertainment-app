const express = require('express');
const { movieControllers, tvseriesControllers, bookmarkControllers, setbookmarkControllers, removeBookmark, trendingMoviesController, recomandmoviescontroller, recomandseriescontroller, checkbookmark, getAllData } = require('../controlers/appdatacontrollers');
const router = express.Router();
const { verifyToken } = require('../middleware/jwtauth')


//getmovie list
router.get('/movies', movieControllers)
//get Tvseries list
router.get('/tvseries', tvseriesControllers)

//get all tvseries and movies
router.get('/getall', getAllData)

//get recomand movies
router.get('/recomand/movies', recomandmoviescontroller)

//get recomand tvseries
router.get('/recomand/tvseries', recomandseriescontroller)


//get trending movies
router.get('/trending/movies', trendingMoviesController)

//get bookmark 
router.get('/bookmark', verifyToken, bookmarkControllers)

// check bookmark
router.get('/bookmark/check', verifyToken, checkbookmark)

//add bookmark
router.post('/bookmark/add', verifyToken, setbookmarkControllers)
//delete bookmark
router.delete('/bookmark/remove/:id', verifyToken, removeBookmark)


module.exports = router;
