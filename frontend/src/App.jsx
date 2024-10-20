import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo } from "./features/todo/todoSlice";
import { FlipWords } from "./components/ui/flip-words";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./appComponents/Dashboard";
import Demo from "./appComponents/Demo";
import Auth from "./pages/Auth";
import GitHubRepoInfo from "./appComponents/GithubRepoInfo";
import RegisterVerify from "./pages/RegisterVerify";
import Board from "./appComponents/Board";
import Teams from "./appComponents/Teams";
import TaskList from "./appComponents/TaskList";
import ChatComponent from "./appComponents/ChatComponent";
import Home from "./pages/Home";
import VideoStream from "./videoCC/VideoStream";
import ManageAccount from "./appComponents/ManageAccount";

function App() {
  const dispatch = useDispatch();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<RegisterVerify />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="CoMeet" element={<VideoStream />} />
          <Route path="board" element={<Board />} />
          <Route path="teams" element={<Teams />} />
          <Route path="demo" element={<Board />} />
          <Route path="list" element={<TaskList />} />
          <Route path="messages" element={<ChatComponent />} />
          <Route path="githubStats" element={<GitHubRepoInfo />} />
        </Route>
        <Route path="/manageaccount" element={<ManageAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
