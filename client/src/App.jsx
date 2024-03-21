import './App.css'
import Bookmark from './pages/Bookmark/Bookmark'
import Homepage from './pages/Home/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import TVseries from './pages/TVseries/TVseries'
import Movie from './pages/movie/Movie'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MovieDetailsPage from './component/Detailcomponent'
import MultiSearch from './pages/Home/MultiSearch'
import Moviesearch from './pages/movie/Moviesearch'
import TvSearch from './pages/TVseries/TvSearch'
import BookmarkSearch from './pages/Bookmark/BookmarkSearch'
import Preloader from './component/Preloader'

function App() {

  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {/* for routing */}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/movies" element={<Movie />} />
        <Route exact path="/tvseries" element={<TVseries />} />
        <Route exact path="/bookmark" element={<Bookmark />} />
        <Route exact path="/detail" element={<MovieDetailsPage />} />
        <Route exact path="/search/multi" element={<MultiSearch />} />
        <Route exact path="/search/movie" element={<Moviesearch />} />
        <Route exact path="/search/series" element={<TvSearch />} />
        <Route exact path="/search/bookmark" element={<BookmarkSearch />} />
        <Route exact path="/preloader" element={<Preloader />} />
      </Routes>


    </>
  )
}

export default App
