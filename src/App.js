import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Navbar from './components/Navbar';
import './App.css'; 

function App() {
  return (
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
  );
}

export default App;
