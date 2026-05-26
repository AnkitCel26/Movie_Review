import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import PopularPages from "./Pages/PopularPages";
import UpcomingPages from "./Pages/UpcomingPages";
import TvShowsPages from "./Pages/TvShowPages";
import Movie from "./Pages/Movie";
import MovieDetails from "./Pages/MovieDetails";
import Favourite from "./Pages/Favourite";
// import { Login } from "@mui/icons-material";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
         <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/popular" element={<PopularPages />} />
        <Route path="/upcoming" element={<UpcomingPages />} />
        <Route path="/tvshows" element={<TvShowsPages />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
