const express = require('express');
const { moviesearch, seriessearch, multisearch, bookmarkSearch } = require('../controlers/search');
const { verifyToken } = require('../middleware/jwtauth')


const router = express.Router();

router.get('/movie/search/:query', moviesearch)
router.get('/series/search/:query', seriessearch)
router.get('/all/search/:query', multisearch)
router.get('/bookmark/search/:query', verifyToken, bookmarkSearch)



module.exports = router;
