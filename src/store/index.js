import { createStore } from "redux";
import { todoReducers } from "./todo/todo.reducers";

export default createStore(todoReducers);
