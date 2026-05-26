

import React from "react";
import Header from "../Components/Common/Header";
import { Box, Typography } from "@mui/material";
import Banner from "../Components/Banner";
import Upcoming from "../Components/Upcoming";
import Latest from "../Components/Latest";
import Footer from "../Components/Common/Footer";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../Helpers/httprequest";

const Home = () => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  
  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
  } = useQuery({
    queryKey: ["now_playing"],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/now_playing?api_key=${API_KEY}`,
        undefined,
        undefined,
        undefined
      ),
    refetchOnWindowFocus: false,
    refetch: false,
  });

  
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    isError: upcomingError,
  } = useQuery({
    queryKey: ["upcoming_movies"],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/upcoming?api_key=${API_KEY}`,
        undefined,
        undefined,
        undefined
      ),
    refetchOnWindowFocus: false,
    refetch: false,
  });

  const nowPlaying = nowPlayingData?.results || [];
  const upcoming = upcomingData?.results || [];

  if (nowPlayingLoading || upcomingLoading)
    return <Typography sx={{ color: "white" }}>Loading data...</Typography>;

  return (
    <>
      <Header />

      <Box>
        <Banner movies={nowPlaying} />
        <Upcoming movies={upcoming} />
        <Latest movies={nowPlaying} />
      </Box>

      <Footer />
    </>
  );
};

export default Home;

