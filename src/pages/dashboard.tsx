import { useNavigate } from "react-router-dom";
import { getUserLists } from "../features/todo/services/todoService";
import { useEffect, useState } from "react";
import type { TodoList } from "../types/todo";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import NavBar from "../components/layout/navBar";
import TodoDetails from "../features/todo/components/todoDetails";
import TodoCreate from "../features/todo/components/todoCreate";
import TodoListGrid from "../features/todo/components/todoListGrid";
import {
  DASHBOARD_CONTENT,
  COLORS_PASTEL,
} from "../features/todo/constants/todo.constants";

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
  const { title, subtitle } = DASHBOARD_CONTENT[currentView];

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

  useEffect(() => {
    if (view === "lists" || view === "create") {
      setSelectedList(null);
    }
  }, [view]);

  const renderContent = () => {
    switch (currentView) {
      case "create":
        return <TodoCreate setSelectedList={setSelectedList} />;

      case "details":
        if (!selectedList) return null;
        const listIndex = lists.findIndex((l) => l.id === selectedList.id);
        return (
          <TodoDetails
            list={selectedList}
            color={COLORS_PASTEL[listIndex % 4]}
          />
        );

      default:
        return (
          <TodoListGrid
            lists={lists}
            onSelect={setSelectedList}
            onCreateClick={() => navigate("/create-list")}
            classes={classes}
          />
        );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.nav__container}>
        <NavBar />
      </Box>

      <Box className={classes.dashboard__container}>
        <Box className={classes.title__container}>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>

        <Box className={classes.right__container}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
