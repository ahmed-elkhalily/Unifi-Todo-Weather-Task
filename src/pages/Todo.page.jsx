import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAction, editTodoAction } from "../store/todo/todo.actions";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";

import TodoItem from "../components/todo/TodoItem.components";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [inputMode, setInputMode] = useState("add");
  const [id, setId] = useState(0);

  const dispatch = useDispatch();

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
          <TodoItem
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            inputMode={inputMode}
            setInputMode={setInputMode}
            id={id}
            setId={setId}
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default Todo;
