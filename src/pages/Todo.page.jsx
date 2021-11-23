import { useState } from "react";
import { Grid, Container, Box } from "@mui/material";

import TodoItem from "../components/todo/TodoItem.components";
import TodoForm from "./../components/todo/TodoForm.component";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputMode, setInputMode] = useState("add");
  const [id, setId] = useState(0);

  return (
    <Box>
      <Container>
        <Grid container spacing={4}>
          <TodoForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            inputMode={inputMode}
            setInputMode={setInputMode}
            id={id}
            setId={setId}
          />
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
