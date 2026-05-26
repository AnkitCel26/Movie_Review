import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { API_KEY } from "../Constant/Constant";
import styles from "./MovieDetails.module.css";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../Helpers/httprequest";
import Loader from "../Components/Loader";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";

const MovieDetails = () => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFav, setIsFav] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie_details"],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/${id}?api_key=${API_KEY}`,
        undefined,
        undefined,
        undefined,
      ),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    setMovie(data);
  }, [data]);

  useEffect(() => {
    if (!movie) return;

    const currentUser = localStorage.getItem("currentUser");

    const allData = JSON.parse(localStorage.getItem("userFavourites")) || {};

    const userFavs = allData[currentUser] || [];

    const exists = userFavs.some((m) => m.id === movie.id);

    setIsFav(exists);
  }, [movie]);

  
  if (isLoading) return <Loader />;

  const addFavourite = () => {
    if (!movie) return;

    const currentUser = localStorage.getItem("currentUser");

    const allData = JSON.parse(localStorage.getItem("userFavourites")) || {};

    const userFavs = allData[currentUser] || [];

    const exists = userFavs.some((item) => item.id === movie.id);

    if (exists) return;

    const updatedUserFavs = [...userFavs, movie];

    const updatedData = {
      ...allData,
      [currentUser]: updatedUserFavs,
    };

    localStorage.setItem("userFavourites", JSON.stringify(updatedData));

    setIsFav(true);
  };
  return (
    <>
    <Header/>
    <Box
      className={styles.container}
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Box className={styles.wrapper}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={movie?.title}
        />

        <Box className={styles.details}>
          <Typography className={styles.title}>{movie?.title}</Typography>

          <Box className={styles.minidata}>
            <Box>
              <span className={styles.rating}>⭐ {movie?.vote_average}</span>
              <span className={styles.tag}>{movie?.release_date}</span>
            </Box>
            <Box>
              <span className={styles.tag}>{movie?.runtime} min</span>
              <span className={styles.tag}>Budget {movie?.budget} </span>
            </Box>
          </Box>
          <Box className={styles.overview}>
            <Typography>{movie?.overview}</Typography>
          </Box>

          <Box
            sx={{
              // bgcolor: "",

              marginTop: 3,
              height: 50,
              width: 150,
              borderRadius: 10,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
            }}
          >
            <Typography sx={{ color: "yellow", fontWeight: 800 }}>
              Status :-
              {movie?.status}
            </Typography>
          </Box>
          <button
            style={{
              backgroundColor: isFav ? "red" : "green",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={addFavourite}
            className={styles.favBtn}
            disabled={isFav}
          >
            {isFav ? "Added" : "Add Favourite"}
          </button>
        </Box>
      </Box>
    </Box>
    {/* <Footer/> */}
    </>
  );
};

export default MovieDetails;
