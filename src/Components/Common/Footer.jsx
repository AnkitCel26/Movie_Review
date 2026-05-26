import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { logoURL } from "../../Constant/Constant";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection} onClick={() => navigate("/")}>
        <img src={logoURL} alt="logo" className={styles.logo} />

        <Typography variant="h5" className={styles.logoName}>
          MovieX
        </Typography>
      </div>

      <Typography className={styles.tagline}>
        Unlimited Movies, TV Shows & Entertainment
      </Typography>

      <Typography className={styles.copyRight}>
        © {new Date().getFullYear()} MovieX. All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;