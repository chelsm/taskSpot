import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoPreview from "./todoPreview";
import type { TodoList } from "../../../types/todo";
import { makeStyles } from "@mui/styles";
interface TodoListGridProps {
  lists: TodoList[];
  onSelect: (list: TodoList) => void;
  onCreateClick: () => void;
}

const useStyles = makeStyles({
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
  }
});

const TodoListGrid = ({ lists, onSelect, onCreateClick }: TodoListGridProps) => {
  const colorsPastel = ["#ecc7c6", "#f6e0c4", "#d5d2fa", "#c9efdd"];
    const classes = useStyles();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={onCreateClick}
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
        {lists.map((list, i) => (
          <Box
            key={list.id}
            onClick={() => onSelect(list)}
            sx={{ cursor: "pointer" }}
          >
            <TodoPreview list={list} color={colorsPastel[i % colorsPastel.length]} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TodoListGrid;
