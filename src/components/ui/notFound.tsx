import { Box, Typography } from "@mui/material";
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
    textAlign: "center",
  },
  errorCode: {
    textTransform: "uppercase",
    fontFamily: "Poppins-ExtraBold",
    fontSize: "8rem",
    fontWeight: 800,
    color: "var(--bg-button)",
    lineHeight: 1,
    margin: 0,
    "@media (max-width:600px)": {
      fontSize: "5rem",
    },
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "var(--text-primary)",
    "@media (max-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  button: {
    backgroundColor: "var(--bg-button)",
    color: "white",
    padding: "0.8rem 2rem",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "var(--bg-button-hover)",
    },
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.errorCode}>404 Error</Typography>
      <Typography className={classes.title}>
        Oops! Page not found
      </Typography>
    </Box>
  );
};

export default NotFound;
