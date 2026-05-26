// import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";

// const Favourite = () => {
//   const [movies, setMovies] = useState([]);

//   const loadFavourites = () => {
//     const data = JSON.parse(localStorage.getItem("favourite")) || [];
//     setMovies(data);
//   };

//   useEffect(() => {
//     loadFavourites();
//   }, []);

//   const removeFavourite = (id) => {
//     const updated = movies.filter((movie) => movie.id !== id);
//     setMovies(updated);
//     localStorage.setItem("favourite", JSON.stringify(updated));
//   };

//   return (
//     <Box sx={{ padding: 4, color: "white" }}>
//       <Typography variant="h4">My Favourite Movies</Typography>

//       {movies.length === 0 ? (
//         <Typography sx={{ mt: 2 }}>No favourites added</Typography>
//       ) : (
//         movies.map((movie) => (
//           <Box
//             key={movie.id}
//             sx={{
//               mt: 2,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               border: "1px solid gray",
//               padding: 2,
//               borderRadius: 2,
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <img
//                 src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//                 alt={movie.title}
//                 style={{
//                   width: "70px",
//                   height: "100px",
//                   borderRadius: "8px",
//                   objectFit: "cover",
//                 }}
//               />

//               <Typography>{movie.title || movie.name}</Typography>
//             </Box>

//             <button
//               onClick={() => removeFavourite(movie.id)}
//               style={{
//                 background: "red",
//                 color: "white",
//                 border: "none",
//                 padding: "6px 12px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               Remove
//             </button>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// export default Favourite;

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Favourite = () => {
  const [movies, setMovies] = useState([]);

  const currentUser = localStorage.getItem("currentUser");

  const loadFavourites = () => {
    const allData =
      JSON.parse(localStorage.getItem("userFavourites")) || {};

    const userMovies = allData[currentUser] || [];
    setMovies(userMovies);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const removeFavourite = (id) => {
    const allData =
      JSON.parse(localStorage.getItem("userFavourites")) || {};

    const userMovies = allData[currentUser] || [];

    const updatedMovies = userMovies.filter((movie) => movie.id !== id);

    const updatedData = {
      ...allData,
      [currentUser]: updatedMovies,
    };

    localStorage.setItem(
      "userFavourites",
      JSON.stringify(updatedData)
    );

    setMovies(updatedMovies);
  };

  return (
    <Box sx={{ padding: 4, color: "white" }}>
      <Typography variant="h4">My Favourite Movies</Typography>

      {movies.length === 0 ? (
        <Typography sx={{ mt: 2 }}>
          No favourites added
        </Typography>
      ) : (
        movies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid gray",
              padding: 2,
              borderRadius: 2,
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "70px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />

              <Typography>
                {movie.title || movie.name}
              </Typography>
            </Box>

            <button
              onClick={() => removeFavourite(movie.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Favourite;