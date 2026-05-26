import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { getMovieUsers, saveMovieUsers } from "../LocalStorage/MovieStore";
import styles from "./Auth.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const users = getMovieUsers();

    const exists = users.find((u) => u.email === form.email);
    if (exists) return alert("User already exists");

    const newUser = {
      ...form,
      movies: [],
    };

    users.push(newUser);
    saveMovieUsers(users);
    setForm({
      name: "",
      email: "",
      password: "",
    });
    navigate("/login");
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
        <Typography className={styles.authTitle}>Signup</Typography>

        <TextField
          fullWidth
          name="name"
          label="Name"
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
          onClick={handleSignup}
        >
          Signup
        </Button>

        <Typography className={styles.authLink}>
          You already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
