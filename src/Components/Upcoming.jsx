import { Typography, Box, styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Component = styled(Box)`
  padding: 20px;
`;

const Heading = styled(Typography)`
  color: white;
  font-weight: 700 !important;
  font-size: 28px !important;
  margin-bottom: 25px !important;
`;

const MovieContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled(Box)`
  position: relative;
  width: 220px;
  height: 330px;
  border-radius: 20px;
  border: 1px solid white;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.5);
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const Poster = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const Upcoming = ({ movies }) => {
  return (
    <Component>
      <Heading>Upcoming Movies</Heading>

      <MovieContainer>
        {movies.slice(0,14).map((movie) => (
          <Card key={movie.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="poster"
            />
          </Card>
        ))}
      </MovieContainer>
    </Component>
  );
};

export default Upcoming;
