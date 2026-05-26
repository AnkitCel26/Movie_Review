// import MoviePage from "../Pages/MoviePage";

import { TVTOPRATED_API_URL } from "../Constant/Constant";
import MoviePages from "./MoviePages";

const TvShowsPage = () => {
  return (
    <MoviePages
      title="TV Shows"
      api={TVTOPRATED_API_URL}
    />
  );
};

export default TvShowsPage;