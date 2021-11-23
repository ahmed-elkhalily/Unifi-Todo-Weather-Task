import { todoTypes } from "./todo.types";

const initialState = [];
export const todoReducers = (state = initialState, action) => {
  switch (action.type) {
    case todoTypes.ADD_ITEM_TODO:
      return [...state, action.payload];
    case todoTypes.EDIT_ITEM_TODO:
      const { createdDate, title, description } = action.payload;
      return state.map((item) => {
        if (item.createdAt === createdDate) {
          item.title = title;
          item.description = description;
        }
        return item;
      });

    case todoTypes.REMOVE_ITEM_TODO:
      return state.filter((item, index) => index !== action.payload);

    case todoTypes.ARCHIVE_ITEM_TODO:
      return state.map((item, index) => {
        if (index === action.payload) {
          if (item.archivedAt !== null) item.archivedAt = null;
          else item.archivedAt = new Date().toUTCString();
        }
        return item;
      });

    case todoTypes.COMPLETE_ITEM_TODO:
      return state.map((item, index) => {
        if (index === action.payload) {
          if (item.checked) item.finishedAt = null;
          else item.finishedAt = new Date().toUTCString();
          item.checked = !item.checked;
        }
        return item;
      });
    default:
      return state;
  }
};
