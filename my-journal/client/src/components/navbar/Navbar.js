import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>My Journal</Link></div>
    </div>
  )
}

export default Navbar;