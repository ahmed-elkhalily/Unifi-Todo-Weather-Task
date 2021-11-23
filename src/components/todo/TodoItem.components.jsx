import { useSelector, useDispatch } from "react-redux";
import {
  removeTodoAction,
  ArchiveTodoAction,
  completeTaskActoin,
} from "../../store/todo/todo.actions";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";

const TodoItem = ({
  setTitle,
  setDescription,
  id,
  setId,
  setInputMode,
  setEditableDate,
}) => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleEditMode(todoData) {
    const { title, description, date } = todoData;
    setTitle(title);
    setDescription(description);
    setEditableDate(date);

    setInputMode("edit");
  }

  return (
    <Grid item md={7} lg={7} xs={12} sm={12}>
      {todos.length ? (
        todos.map((todo, index) => (
          <Card
            key={index}
            elevation={3}
            sx={{
              marginBottom: "1rem",
            }}
          >
            <CardHeader
              style={{
                marginBottom: (theme) => theme.spacing(2),
              }}
              title={todo.title}
              subheader={todo.createdAt}
            />
            <CardContent>
              <Typography color="secondaryText" variant="body2">
                {todo.description}
              </Typography>
            </CardContent>
            <CardActions
              style={{
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => {
                  setId(id - 1);
                  dispatch(removeTodoAction(index));
                }}
                mr={2}
                color="delete"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleEditMode({
                    date: todo.createdAt,
                    title: todo.title,
                    description: todo.description,
                  })
                }
                color="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => dispatch(completeTaskActoin(index))}
                color={todo.checked ? "checked" : "secondary"}
              >
                <LibraryAddCheckIcon />
              </IconButton>
              <IconButton
                onClick={() => dispatch(ArchiveTodoAction(index))}
                color={todo.archivedAt !== null ? "primary" : "secondary"}
              >
                <ArchiveIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="secondary">
            there's no tasks yet you can add one
          </Typography>
        </Box>
      )}
    </Grid>
  );
};
export default TodoItem;
