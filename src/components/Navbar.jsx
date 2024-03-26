import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeUser());

    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/results">Results</Link></li>
        <li><button onClick={handleLogout}>Log Out</button></li>

      </ul>
    </nav>
  );
}

export default Navbar;
