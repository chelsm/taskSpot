import { useEffect, useState } from "react";
import type { Task, TodoList } from "../../types/todo";
import {
  getTasksByListId,
  updateTaskStatus,
  updateTaskDescription,
  createTask,
  deleteTask,
  updateListTitle,
  deleteList,
} from "../../services/listService";
import { useNavigate } from "react-router-dom";

import { Timestamp } from "firebase/firestore";

import {
  Box,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ListCardProps {
  list: TodoList;
  color?: string;
}

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    border: "1px solid red",
    width: "stretch",
  },
  details__container: {
    borderRadius: "10px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    border: "1px solid red",
    width: "stretch",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    fontFamily: "Poppins-ExtraBold",
  },

  tasks__container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  task_row: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
});

const Details = ({ list, color }: ListCardProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const colorsPastel = ["#ecc7c6", "#f6e0c4", "#d5d2fa", "#c9efdd"];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState(list.title);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByListId(list.id);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [list.id]);

  const handleTitleBlur = async () => {
    if (!title.trim()) return;

    try {
      await updateListTitle(list.id, title);
      setSnackbar({
        open: true,
        message: "Title updated successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
  ) => {
    const isChecked = e.target.checked;
    updateTaskStatus(list.id, taskId, isChecked);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: isChecked } : task,
      ),
    );
  };

  const updateTaskLocal = (id: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: value } : task,
      ),
    );
  };

  const saveTask = async (id: string, value: string) => {
    if (!value.trim()) return;

    try {
      if (id) {
        await updateTaskDescription(list.id, id, value);
      } else {
        const newTask = await createTask(list.id, value);

        setTasks((prev) =>
          prev.map((task) =>
            task.id === "" ? { ...task, id: newTask.id } : task,
          ),
        );
        setSnackbar({
          open: true,
          message: "Task saved successfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTaskInput = () => {
    const lastTask = tasks[tasks.length - 1];
    if (lastTask && lastTask.description.trim() === "") {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: "",
        description: "",
        completed: false,
        createdAt: Timestamp.now().toDate(),
        modifiedAt: Timestamp.now().toDate(),
      },
    ]);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(list.id, taskId);
      setSnackbar({
        open: true,
        message: "Task deleted successfully",
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteList = async () => {
    try {
      await deleteList(list.id);
      setSnackbar({
        open: true,
        message: "List deleted successfully",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={classes.root}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteList}
          sx={{
            backgroundColor: "var(--bg-button)",
            "&:hover": {
              backgroundColor: "var(--bg-button-hover)",
            },
          }}
        >
          Delete list
        </Button>
      </Box>
      <Box
        className={classes.details__container}
        sx={{
          backgroundColor: color || colorsPastel[0],
        }}
      >
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          variant="standard"
          placeholder="List title"
          fullWidth
          sx={{
            "& input": {
              fontSize: "2rem",
              fontWeight: 700,
              fontFamily: "Poppins-ExtraBold",
            },
            "& .MuiInputBase-root::before": {
              borderBottom: "none",
            },
            "& .MuiInputBase-root:hover::before": {
              borderBottom: "none",
            },
            "& .MuiInputBase-root::after": {
              borderBottom: "2px solid var(--text-primary)",
            },
          }}
        />

        <Box className={classes.tasks__container}>
          {tasks.map((task) => (
            <Box key={task.id} className={classes.task_row}>
              <Checkbox
                checked={task.completed}
                onChange={(e) => handleCheck(e, task.id)}
                sx={{
                  color: "var(--text-primary)",
                  "&.Mui-checked": {
                    color: "var(--text-primary)",
                  },
                }}
              />

              <TextField
                value={task.description}
                placeholder="Task"
                variant="standard"
                fullWidth
                onChange={(e) => updateTaskLocal(task.id, e.target.value)}
                onBlur={(e) => saveTask(task.id, e.target.value)}
                sx={{
                  "& input": {
                    textDecoration: task.completed ? "line-through" : "none",
                    fontFamily: "Poppins-Regular",
                  },
                  "& .MuiInputBase-root::before": {
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                  },
                  "& .MuiInputBase-root:hover::before": {
                    borderBottom: "1px solid rgba(0,0,0,0.4)",
                  },
                  "& .MuiInputBase-root::after": {
                    borderBottom: "2px solid var(--text-primary)",
                  },
                }}
              />

              <IconButton onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button
          startIcon={<AddCircleIcon />}
          onClick={addTaskInput}
          variant="text"
          sx={{
            textTransform: "none",
            fontFamily: "Poppins-Regular",
            alignSelf: "flex-start",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 0.7,
            },
          }}
        >
          task
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Details;
