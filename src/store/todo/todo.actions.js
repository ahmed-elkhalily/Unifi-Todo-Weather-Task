import { todoTypes } from "./todo.types";

export const addTodoAction = (todoData) => {
  return {
    type: todoTypes.ADD_ITEM_TODO,
    payload: todoData,
  };
};
export const removeTodoAction = (taskId) => {
  return {
    type: todoTypes.REMOVE_ITEM_TODO,
    payload: taskId,
  };
};
export const ArchiveTodoAction = (taskId) => {
  return {
    type: todoTypes.ARCHIVE_ITEM_TODO,
    payload: taskId,
  };
};
export const completeTaskActoin = (taskId) => {
  return {
    type: todoTypes.COMPLETE_ITEM_TODO,
    payload: taskId,
  };
};
// //TODO: need to work wiht
export const editTodoAction = (data) => {
  console.log(data);
  return {
    type: todoTypes.EDIT_ITEM_TODO,
    payload: data,
  };
};
