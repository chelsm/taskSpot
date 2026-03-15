import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoList } from "../types/todo";

interface ListState {
  selectedList: TodoList | null;
}

const initialState: ListState = {
  selectedList: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    listSelected: (state, action: PayloadAction<TodoList | null>) => {
      state.selectedList = action.payload;
    },
  },
});

export const { listSelected } = listSlice.actions;

export default listSlice.reducer;