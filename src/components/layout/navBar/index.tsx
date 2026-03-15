import makeStyles from "@mui/styles/makeStyles/makeStyles";
import { handleLogout } from "../../../features/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "var(--bg-secondary)",
    height: "stretch",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
    alignItems: "center",
    "@media (max-width:900px)": {
      flexDirection: "row",
      height: "100%",
      bottom: "1rem",
      top: "auto",
    },
  },
});

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickDashboard = () => {
    navigate("/dashboard");
  };

  const handleClickLogout = () => handleLogout();

  const btnStyle = {
    width: "50px !important",
    height: "50px !important",
    minWidth: "50px",
    borderRadius: "80px",
    backgroundColor: "var(--bg-button)",
    "&:hover": { backgroundColor: "var(--bg-button-hover)" },
    "& .MuiButton-startIcon": { margin: 0 },
    '@media (max-width:900px)': {
      width: "30px !important",
      height: "30px !important",
      minWidth: "30px",
    }
  };

  return (
    <nav className={classes.root}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <Button
          variant="contained"
          startIcon={<SpaceDashboardIcon />}
          onClick={handleClickDashboard}
          sx={btnStyle}
        />
        <Typography sx={{ color: "var(--text)", fontSize: "12px" , textAlign: "center"  }}>
          Dashboard
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <Button
          variant="contained"
          startIcon={<LogoutIcon sx={{ color: "var(--icon)", margin: 0 }} />}
          onClick={handleClickLogout}
          sx={btnStyle}
        />
        <Typography sx={{ color: "var(--text)", fontSize: "12px", textAlign: "center"  }}>
          Logout
        </Typography>
      </Box>
    </nav>
  );
};

export default NavBar;
