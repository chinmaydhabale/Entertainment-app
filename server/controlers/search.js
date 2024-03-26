const usermodel = require('../Models/usermodel');
const tvseries = require('../Models/Tvseriesmodel');
const MovieModel = require('../Models/Moviesmodel');

// Controller for searching movies
exports.moviesearch = async (req, res) => {
    try {
        const { query } = req.params;
        let movies;
        if (query) {
            // If query is provided, perform a case-insensitive search based on the title
            movies = await MovieModel.find({ title: { $regex: new RegExp(query, 'i') } });
        } else {
            res.json({ success: true, massage: "no movie found" })
        }
        res.json({ success: true, moviedata: movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Controller for searching TV series
exports.seriessearch = async (req, res) => {
    try {
        const { query } = req.params;
        let series;
        if (query) {
            // If query is provided, perform a case-insensitive search based on the title
            series = await tvseries.find({ title: { $regex: new RegExp(query, 'i') } });
        } else {
            res.json({ success: true, massage: "no series found" })
        }
        res.json({ success: true, seriesdata: series });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Controller for searching movies and TV series together
exports.multisearch = async (req, res) => {
    try {
        const { query } = req.params;

        // Search for movies
        const movies = await MovieModel.find({ title: { $regex: new RegExp(query, 'i') } });

        // Search for TV series
        const series = await tvseries.find({ title: { $regex: new RegExp(query, 'i') } });

        // Combine movie and series results
        const searchData = [...movies, ...series];

        // Check if any search results found
        if (searchData.length === 0) {
            return res.json({ success: true, message: "No results found" });
        }

        // Respond with the search results
        res.json({ success: true, searchData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Controller for searching bookmarked movies and TV series
exports.bookmarkSearch = async (req, res) => {
    try {
        const { query } = req.params;

        // Search for user document by userId
        const user = await usermodel.findById(req.userId)
            .populate('bookmarkmovie')
            .populate('bookmarkseries');

        // Check if user document exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Combine movie and series bookmark results
        const searchData = [...(user.bookmarkmovie || []), ...(user.bookmarkseries || [])];

        // Filter searchData based on the title matching the query
        const filteredSearchData = searchData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

        // Check if any search results found
        if (filteredSearchData.length === 0) {
            return res.json({ success: true, message: "No results found" });
        }

        // Respond with the search results
        res.json({ success: true, searchData: filteredSearchData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
