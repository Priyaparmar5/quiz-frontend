import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Navbar from './components/Navbar';
import './App.css';
import { useSelector } from 'react-redux';
import { userSelector } from './redux/slices/authSlice';

function App() {
  const user = useSelector(userSelector);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={user ? <Home />: <Navigate to="/login" />} />
        <Route path="/quiz/:id" element={user ? <Quiz /> : <Navigate to="/login" />} />
        <Route path="/results" element={user ? <Results /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
