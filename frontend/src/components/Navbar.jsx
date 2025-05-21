import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="./logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li> 
      </ul>
    </nav>
  );
};

export default Navbar;