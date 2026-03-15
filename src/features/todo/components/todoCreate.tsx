import { useState } from "react";
import { createList, createTask } from "../services/todoService";
import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import type { TodoList } from "../../../types/todo";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  tasksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  buttonsContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
});

interface TodoCreateProps {
  setSelectedList: (list: TodoList) => void;
}

const TodoCreate = ({ setSelectedList }: TodoCreateProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<string[]>([""]);
  const [title, setTitle] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const addTaskInput = () => {
    setTasks([...tasks, ""]);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleClickSubmit = async () => {
    if (!title) {
      setWarningMessage("Please enter a title for your list");
      return;
    }

    const filteredTasks = tasks.filter((t) => t.trim() !== "");

    if (filteredTasks.length === 0) {
      setWarningMessage("Please add at least one task");
      return;
    }

    const newList = await createList(title);

    await Promise.all(
      filteredTasks.map((task) => createTask(newList.id, task)),
    );

    setTitle("");
    setTasks([""]);
    setWarningMessage("");
    setSelectedList(newList);
    navigate(`/list/${newList.id}`);
  };

  return (
    <Box className={classes.root}>
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleClickSubmit}
          sx={{
            backgroundColor: "var(--bg-button)",
            "&:hover": {
              backgroundColor: "var(--bg-button-hover)",
            },
          }}
        >
          Create list
        </Button>
      </Box>

      <TextField
        placeholder="List name"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          fontSize: "2rem",
          "& input": {
            fontSize: "2rem",
            fontWeight: 600,
            padding: "0.5rem 0",
          },
        }}
      />

      <Box className={classes.tasksContainer}>
        {tasks.map((task, index) => (
          <TextField
            key={index}
            placeholder={`Task ${index + 1}`}
            variant="standard"
            value={task}
            onChange={(e) => updateTask(index, e.target.value)}
            fullWidth
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #ccc",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "1px solid #999",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid var(--bg-button)",
              },
            }}
          />
        ))}
      </Box>

      <Box className={classes.buttonsContainer}>
        <Button
          variant="text"
          startIcon={<AddCircleIcon />}
          onClick={addTaskInput}
          sx={{
            marginTop: "1rem",
            color: "var(--bg-button)",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "transparent",
              color: "var(--bg-button-hover)",
            },
          }}
        >
          task
        </Button>
      </Box>

      {warningMessage && (
        <Typography color="error">{warningMessage}</Typography>
      )}
    </Box>
  );
};

export default TodoCreate;
