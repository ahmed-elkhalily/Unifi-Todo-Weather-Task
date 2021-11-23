import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoAction,
  removeTodoAction,
  ArchiveTodoAction,
  completeTaskActoin,
  editTodoAction,
} from "../store/todo/todo.actions";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [inputMode, setInputMode] = useState("add");
  const [id, setId] = useState(0);

  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleEditMode(todoData) {
    const { title, description } = todoData;
    setTitle(title);
    setDescription(description);
    setInputMode("edit");
  }
  function handelSubmit(e) {
    e.preventDefault();
    if (!title) {
      setTitleError(true);
    }
    if (!description) {
      setDescriptionError(true);
    } else {
      setTitleError(false);
      setDescriptionError(false);
      if (inputMode === "add") {
        const data = {
          id,
          title,
          description,
          checked: false,
          createdAt: new Date().toUTCString(),
          finishedAt: null,
          archivedAt: null,
        };
        setId(id + 1);
        dispatch(addTodoAction(data));
      } else {
        setInputMode("add");
        dispatch(
          editTodoAction({
            id,
            title,
            description,
          })
        );
      }

      setTitle("");
      setDescription("");
    }
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={5} lg={5} xs={12} sm={12}>
            <Paper elevation={3}>
              <Grid container>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    padding: (theme) => theme.spacing(2),
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handelSubmit}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="primary"
                    gutterBottom
                  >
                    Create your task
                  </Typography>
                  <TextField
                    label="title"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    margin="dense"
                    required
                    error={titleError}
                  />
                  <TextField
                    fullWidth
                    multiline
                    margin="dense"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    label="description"
                    value={description}
                    error={descriptionError}
                  />
                  {inputMode === "add" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Add to your todo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="edit"
                      fullWidth
                      type="submit"
                    >
                      edit to your todo
                    </Button>
                  )}
                </Box>
              </Grid>
            </Paper>
          </Grid>
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
                          id: index,
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
        </Grid>
      </Container>
    </Box>
  );
};

export default Todo;
