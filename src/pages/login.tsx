import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { handleLogin } from "../features/auth";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
    backgroundColor: "var(--bg-primary)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "2rem",
    borderRadius: "16px",
    backgroundColor: "var(--bg-secondary)",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    "@media (max-width:600px)": {
      fontSize: "1.8rem",
    },
  },
  textField: {
    "& .MuiInputBase-input": {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
  },
  submitButton: {
    backgroundColor: "var(--bg-button)",
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem",
    "&:hover": {
      backgroundColor: "var(--bg-button-hover)",
    },
    fontSize: "1rem",
    "@media (max-width:600px)": {
      fontSize: "0.9rem",
      padding: "0.65rem",
    },
  },
  linkText: {
    textAlign: "center",
    fontSize: "0.9rem",
    "& span": {
      color: "var(--text-primary)",
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "0.85rem",
  },
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleClickLogin} className={classes.formContainer}>
        <Typography variant="h1" className={classes.title}>Login</Typography>
        {errorMessage && (
          <Typography className={classes.errorMessage}>{errorMessage}</Typography>
        )}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          className={classes.textField}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          className={classes.textField}
        />

        <Button type="submit" className={classes.submitButton} fullWidth>
          Login
        </Button>

        <Typography className={classes.linkText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
