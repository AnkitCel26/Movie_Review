import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { getMovieUsers, setCurrentUser } from "../LocalStorage/MovieStore";
import styles from "./Auth.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = getMovieUsers();

    const user = users.find(
      (u) => u.email === login.email && u.password === login.password,
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    setCurrentUser(user.email);
    setLogin({
      email: "",
      password: "",
    });
    navigate("/home");
  };

  return (
    <Box
      className={styles.authPage}
      sx={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4)",
      }}
    >
      <Paper className={styles.authCard}>
        <Typography className={styles.authTitle}>Login</Typography>

        <TextField
          fullWidth
          name="email"
          label="Email"
          onChange={handleChange}
          className={styles.authInput}
          sx={{
            mt: 2,
            backgroundColor: "white",
            borderRadius: 1,
            input: {
              color: "black",
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
          }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          className={styles.authInput}
          sx={{
            mt: 2,
            backgroundColor: "white",
            borderRadius: 1,
            input: {
              color: "black",
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          className={styles.authBtn}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography className={styles.authLink}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
