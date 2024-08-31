import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice';
import {createStore} from 'redux'
import combined_Reducers from './state/combined_reducers';
// export const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
// })

const store = createStore(combined_Reducers);

export default store;