import { useNavigate } from "react-router-dom";
import { getUserLists } from "../services/listService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { TodoList } from "../types/todo";

import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardList from "../components/card/listCard";
import Details from "../components/card/detailsCard";
import NavBar from "../components/navBar";
import CreateListOfTasks from "../components/createListOfTasks";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    width: "100%",
    minHeight: "100vh",
    "@media (max-width:900px)": {
      flexDirection: "column",
    },
  },
  nav__container: {
    position: "sticky",
    top: "1rem",
    left: "1rem",
    height: "calc(100vh - 2rem)",
    "@media (max-width:900px)": {
      width: "calc(100% - 2rem)",
      position: "fixed",
      bottom: "1rem",
      top: "auto",
      height: "60px",
      zIndex: 1000,
    },
  },
  dashboard__container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    paddingBottom: "80px",
    paddingTop: "3rem",
  },
  title__container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0 1rem",
  },
  right__container: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "0 1rem",
  },
  task_list__container: {
    padding: "1rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    "@media (max-width:900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width:600px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

interface DashboardProps {
  view?: "lists" | "create" | "details";
}

const Dashboard = ({ view }: DashboardProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [lists, setLists] = useState<TodoList[]>([]);
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);

  const currentView = view || (selectedList ? "details" : "lists");
  const colorsPastel = ["#ecc7c6", "#f6e0c4", "#d5d2fa", "#c9efdd"];

  console.log("lists:", lists);
  const fetchLists = async () => {
    try {
      const data = await getUserLists();
      setLists(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [currentView]);

  const dashboardTitles = {
    lists: {
      title: "Things to do",
      subtitle: "Welcome to your dashboard! View and manage your todo lists.",
    },
    create: {
      title: "Create a new list",
      subtitle: "Add tasks and organize your work.",
    },
    details: {
      title: "List details",
      subtitle: "Manage tasks inside your list.",
    },
  };

  const handleClickGoToCreateList = () => navigate("/create-list");

  const renderContent = () => {
    if (currentView === "create") {
      return (
        <Box>
          <CreateListOfTasks setSelectedList={setSelectedList} />
        </Box>
      );
    }

    if (currentView === "details" && selectedList) {
      const listIndex = lists.findIndex((l) => l.id === selectedList.id);
      const color = colorsPastel[listIndex % colorsPastel.length];
      return (
        <Box>
          <Details list={selectedList} color={color} />
        </Box>
      );
    }

    return (
      <>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleClickGoToCreateList}
            sx={{
              margin: "1rem",
              backgroundColor: "var(--bg-button)",
              "&:hover": { backgroundColor: "var(--bg-button-hover)" },
            }}
          >
            Create New List
          </Button>
        </Box>
        <Box className={classes.task_list__container}>
          {lists.map((list, i) => {
            const color = colorsPastel[i % colorsPastel.length];
            return (
              <Box
                key={list.id}
                onClick={() => setSelectedList(list)}
                sx={{ cursor: "pointer" }}
              >
                <CardList list={list} color={color} />
              </Box>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.nav__container}>
        <NavBar />
      </Box>

      <Box className={classes.dashboard__container}>
        <Box className={classes.title__container}>
          <Typography variant="h1">
            {dashboardTitles[currentView].title}
          </Typography>
          <Typography variant="subtitle1">
            {dashboardTitles[currentView].subtitle}
          </Typography>
        </Box>

        <Box className={classes.right__container}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
