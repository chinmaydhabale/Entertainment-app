const express = require('express');
const { moviesearch, seriessearch, multisearch, bookmarkSearch } = require('../controlers/search');
const { verifyToken } = require('../middleware/jwtauth')

const router = express.Router();

// Route to search movies by query
router.get('/movie/search/:query', moviesearch)

// Route to search TV series by query
router.get('/series/search/:query', seriessearch)

// Route to search both movies and TV series by query
router.get('/all/search/:query', multisearch)

// Route to search bookmarks by query (requires token verification)
router.get('/bookmark/search/:query', verifyToken, bookmarkSearch)

module.exports = router;
