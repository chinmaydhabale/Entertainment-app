const express = require('express');
const { movieControllers, tvseriesControllers, bookmarkControllers, setbookmarkControllers, removeBookmark, trendingMoviesController, recomandmoviescontroller, recomandseriescontroller, checkbookmark, getAllData } = require('../controlers/appdatacontrollers');
const router = express.Router();
const { verifyToken } = require('../middleware/jwtauth')


//getmovie list
router.get('/movies', verifyToken, movieControllers)
//get Tvseries list
router.get('/tvseries', verifyToken, tvseriesControllers)

//get all tvseries and movies
router.get('/getall', verifyToken, getAllData)

//get recomand movies
router.get('/recomand/movies', verifyToken, recomandmoviescontroller)

//get recomand tvseries
router.get('/recomand/tvseries', verifyToken, recomandseriescontroller)


//get trending movies
router.get('/trending/movies', verifyToken, trendingMoviesController)

//get bookmark 
router.get('/bookmark', verifyToken, bookmarkControllers)

// check bookmark
router.post('/bookmark/check', verifyToken, checkbookmark)

//add bookmark
router.post('/bookmark/add', verifyToken, setbookmarkControllers)
//delete bookmark
router.delete('/bookmark/remove/:id', verifyToken, removeBookmark)


module.exports = router;
