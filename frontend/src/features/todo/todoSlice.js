import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
   name: 'todos',
   initialState: [],
   reducers: {
      addTodo: (state, action) => {
         const newTodo = {
            id: Date.now(),
            text: action.payload,
         };
         state.push(newTodo);
      },
   },
});

// this is for dispatch
export const { addTodo, } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;