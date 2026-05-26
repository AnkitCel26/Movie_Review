import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { logoURL } from "../../Constant/Constant";
import styles from "./Header.module.css";
// import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Header = () => {
  const navigate = useNavigate();
  const [elem, setElem] = useState(null);

  const handleClick = (e) => {
    // console.log(e);
    setElem(e.currentTarget);
  };

  const handleClose = () => {
    setElem(null);
  };
  const goFavourite = () => {
    handleClose();
    navigate("/favourite");
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    handleClose();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(15,15,15,0.6)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "none",
        color: "#fff",
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <img className={styles.logo} src={logoURL} alt="" loading='lazy'/>
          <Typography variant="h5" className={styles.logoName}>
            MovieX
          </Typography>
        </Box>

        {/* <Box sx={{ flexGrow: 1 }} /> */}

        <Box className={styles.buttonBox}>
          <Box className={styles.buttonBox}>
            <Button color="inherit"  onClick={() => navigate("/movie") }>
              Movies
            </Button>

            <Button color="inherit" onClick={() => navigate("/tvshows")}>
              Tv Shows
            </Button>

            <Button color="inherit" onClick={() => navigate("/popular")}>
              Popular
            </Button>

            <Button color="inherit" onClick={() => navigate("/upcoming")}>
              Upcoming
            </Button>
          </Box>
        </Box>

        <Box className={styles.searchBox}>
          <SearchBar />
        </Box>

        <Box className={styles.fav}>
          <Button color="inherit" onClick={() => navigate("/favourite")}>
            Favourite
          </Button>
          <IconButton onClick={handleClick}>
            <Avatar src={PermIdentityIcon}></Avatar>
          </IconButton>
            
          <Menu anchorEl={elem} open={Boolean(elem)} onClose={handleClose}>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={goFavourite}>My Favourite</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
