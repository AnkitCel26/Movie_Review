// import MoviePage from "../Pages/MoviePage";
import { POPULAR_API_URL } from "../Constant/Constant";
import MoviePages from "./MoviePages";

const PopularPage = () => {
  return (
    <MoviePages
      title="Popular Movies"
      api={POPULAR_API_URL}
    />
  );
};

export default PopularPage;