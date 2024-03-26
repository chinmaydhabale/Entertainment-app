const usermodal = require('../Models/usermodel')
const tvseries = require('../Models/Tvseriesmodel');
const MovieModel = require('../Models/Moviesmodel');

// Controller to get all movies
exports.movieControllers = async (req, res) => {
    try {
        const moviedata = await MovieModel.find({});

        if (!moviedata) {
            return res.status(200).send({
                success: false,
                massage: 'No movie found'
            })
        }

        return res.status(200).send({
            MovieCount: moviedata.length,
            success: true,
            massage: 'All movie lists',
            moviedata
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error while getting movie',
            error
        })
    }
}

// Controller to get all TV series
exports.tvseriesControllers = async (req, res) => {
    try {
        const tvseriesdata = await tvseries.find({})
        if (!tvseriesdata) {
            return res.status(200).send({
                success: false,
                massage: 'No tvseries found'
            })
        }

        return res.status(200).send({
            tvseriesCount: tvseriesdata.length,
            success: true,
            massage: 'All tvseries lists',
            tvseriesdata
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error while getting Tvseries',
            error
        })
    }
}


// Controller to get all data (both movies and TV series)
exports.getAllData = async (req, res) => {
    try {
        const movies = await MovieModel.find({});
        const tvSeries = await TVSeriesModel.find({});

        const allData = [...movies, ...tvSeries];

        if (allData.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No data found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All data lists',
            dataCount: allData.length,
            allData
        });
    } catch (error) {
        console.error('Error while getting data:', error);
        res.status(400).json({
            success: false,
            message: 'Error while getting data',
            error
        });
    }
};

// Controller to get recommended movies
exports.recomandmoviescontroller = async (req, res) => {
    try {
        const recomandmovies = await MovieModel.aggregate([
            { $match: { genre: { $in: ["Action", "Crime", "Drama"] } } },
            { $sample: { size: 20 } }
        ]);

        if (!recomandmovies || recomandmovies.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No movies found'
            });
        }

        return res.status(200).json({
            MovieCount: recomandmovies.length,
            success: true,
            message: 'Recommended movies list',
            recomandmovies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error while getting movies',
            error: error.message
        });
    }
}

// Controller to get recommended TV series
exports.recomandseriescontroller = async (req, res) => {

    try {
        const recomandseries = await tvseries.aggregate([
            { $match: { genre: { $in: ["Crime", "Drama", "Thriller"] } } },
            { $sample: { size: 20 } }
        ]);

        if (!recomandseries || recomandseries.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No movies found'
            });
        }

        return res.status(200).json({
            MovieCount: recomandseries.length,
            success: true,
            message: 'Recommended movies list',
            recomandseries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error while getting movies',
            error: error.message
        });
    }


}


// Controller to get trending movies
exports.trendingMoviesController = async (req, res) => {
    try {
        // Fetch movies sorted by rank (descending order)
        const trendingMovies = await MovieModel.find().sort({ rank: 1 }).limit(10);

        res.status(200).json({
            success: true,
            message: 'Trending movies fetched successfully',
            trendingMovies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to get user's bookmarked movies and TV series
exports.bookmarkControllers = async (req, res) => {
    try {
        const user = await usermodal.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookmarkMovies = await Promise.all(user.bookmarkmovie.map(async (movieId) => {
            const movie = await MovieModel.findById(movieId);
            return movie;
        }));
        const bookmarktvseries = await Promise.all(user.bookmarkseries.map(async (tvid) => {
            const tvshow = await tvseries.findById(tvid)
            return tvshow
        }))
        const newUser = { ...user.toObject(), bookmarkmovie: bookmarkMovies, bookmarkseries: bookmarktvseries };

        res.status(200).send({
            success: true,
            massage: 'all bookmark found',
            bookmark: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Controller to check if a movie or TV series is bookmarked by the user
exports.checkbookmark = async (req, res) => {

    const user = await usermodal.findById(req.userId);

    return res.status(200).json({
        message: ' bookmark not exist exists',
        success: true,
        bookmarkmovie: user.bookmarkmovie,
        bookmarkseries: user.bookmarkseries
    });

}

// Controller to add a movie or TV series to user's bookmarks
exports.setbookmarkControllers = async (req, res) => {
    const { movieId, tvseriesId } = req.body;
    try {
        const user = await usermodal.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the bookmark already exists
        if (movieId && user.bookmarkmovie.includes(movieId)) {
            return res.status(400).json({ message: 'Movie bookmark already exists', success: false });
        }

        if (tvseriesId && user.bookmarkseries.includes(tvseriesId)) {
            return res.status(400).json({ message: 'TV series bookmark already exists', success: false });
        }

        // Add unique movie ID to bookmarks
        if (movieId) {
            user.bookmarkmovie.push(movieId);
        }

        // Add unique TV series ID to bookmarks
        if (tvseriesId) {
            user.bookmarkseries.push(tvseriesId);
        }

        await user.save();
        res.status(201).json({
            success: true,
            message: "Bookmark added successfully",
            movie: user.bookmarkmovie,
            series: user.bookmarkseries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// Controller to remove a bookmarked movie or TV series
exports.removeBookmark = async (req, res) => {
    const { id } = req.params
    try {
        const user = await usermodal.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the bookmark exists and remove it
        let removedBookmark = null;
        if (user.bookmarkmovie.includes(id)) {
            removedBookmark = id;
            user.bookmarkmovie.pull(id);
        }
        if (user.bookmarkseries.includes(id)) {
            removedBookmark = id;
            user.bookmarkseries.pull(id);
        }

        if (!removedBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Bookmark deleted successfully',
            removedBookmark
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
