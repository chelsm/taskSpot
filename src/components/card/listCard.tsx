import type { Task, TodoList } from "../../types/todo";
import { useEffect, useState } from "react";
import { getTasksByListId } from "../../services/listService";
import { useDispatch } from "react-redux";
import { Box, Checkbox, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card__container: {
    borderRadius: "10px",
    width: "auto",
    padding: "1rem",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.01)",
      transition: "transform 0.2s ease-in-out",
    },
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  card__tasks: {
    display: "flex",
    flexDirection: "column",
  },
  card__title: {
    textTransform: "uppercase",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    textAlign: "left",
  },
  card__tasks_item: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
});

interface ListCardProps {
  list: TodoList;
  color: string;
}

const Card = ({ list, color }: ListCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
    const navigate = useNavigate();
  

  const [tasks, setTasks] = useState<Task[]>([]);

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
  }, []);

  const handleClickGoToListDetails = () => {
    navigate(`/list/${list.id}`);
  };

  return (
    <Box
      className={classes.card__container}
      sx={{
        backgroundColor: color,
      }}
      onClick={handleClickGoToListDetails}
    >
      <Typography
        className={classes.card__title}
        sx={{
          fontSize: 30,
          fontFamily: "Poppins-ExtraBold",
          "@media (max-width:600px)": {
            fontSize: 22,
          },
        }}
      >
        {list.title}
      </Typography>
      <Box className={classes.card__tasks}>
        {tasks.slice(0, 5).map((task) => (
          <Box key={task.id} className={classes.card__tasks_item}>
            <Checkbox
              checked={task.completed}
              readOnly
              sx={{
                color: "var(--text-primary)",
                "&.Mui-checked": {
                  color: "var(--text-primary)",
                },
              }}
            />
            <Typography
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                fontFamily: "Poppins-Regular",
              }}
            >
              {task.description}
            </Typography>
          </Box>
        ))}
        <Typography
          sx={{
            fontFamily: "Poppins-Regular",
          }}
        >
          {tasks.length > 5 && <p>...</p>}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
