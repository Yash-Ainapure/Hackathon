import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from './features/todo/todoSlice';
import { FlipWords } from "./components/ui/flip-words";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./appComponents/Dashboard";
import Demo from "./appComponents/Demo"
import Auth from './pages/Auth';


function App() {

  const dispatch = useDispatch();


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
