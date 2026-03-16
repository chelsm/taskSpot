import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "var(--bg-primary)",
    gap: "1.5rem",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  logoContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-ExtraBold",
    color: "var(--text-primary)",
    letterSpacing: "1px",
    textAlign: "center",
    padding: "0 2rem",
    fontSize: "2rem",
    "@media (max-width:600px)": {
      fontSize: "1rem",
    },
  },
});

const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.logoContainer}>
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "var(--bg-button)",
          }}
        />
      </Box>
      <Typography className={classes.text}>
        Loading ...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
