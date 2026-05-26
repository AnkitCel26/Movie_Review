// import MoviePage from "../Pages/MoviePage";
import { UPCOMING_API_URL } from "../Constant/Constant";
import MoviePages from "./MoviePages";

const UpcomingPage = () => {
  return (
    <MoviePages
      title="Upcoming Movies"
      api={UPCOMING_API_URL}
    />
  );
};

export default UpcomingPage;