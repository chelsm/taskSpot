// src/features/todo/components/TodoListGrid.tsx
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoPreview from "./todoPreview";
import type { TodoList } from "../../../types/todo";

interface TodoListGridProps {
  lists: TodoList[];
  onSelect: (list: TodoList) => void;
  onCreateClick: () => void;
  classes: any; // On peut passer les classes du dashboard ou définir les siennes
}

const TodoListGrid = ({ lists, onSelect, onCreateClick, classes }: TodoListGridProps) => {
  const colorsPastel = ["#ecc7c6", "#f6e0c4", "#d5d2fa", "#c9efdd"];

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