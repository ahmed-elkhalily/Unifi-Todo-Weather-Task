import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAction, editTodoAction } from "../../store/todo/todo.actions";
import { Grid, Paper, TextField, Typography, Box, Button } from "@mui/material";

const TodoForm = ({
  title,
  setTitle,
  description,
  setDescription,
  id,
  setId,
  inputMode,
  setInputMode,
  editableDate,
  setEditableDate,
}) => {
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
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
            createdDate: editableDate,
            title,
            description,
          })
        );
        setEditableDate(null);
      }
      setTitle("");
      setDescription("");
    }
  }

  return (
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
              <Button variant="contained" color="edit" fullWidth type="submit">
                edit to your todo
              </Button>
            )}
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TodoForm;
