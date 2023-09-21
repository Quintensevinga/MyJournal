import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <div className='menu'>
      <ul className='menuList'>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/my-journals">Journals</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li>Insights</li>
        <li>Settings</li>
      </ul>
    </div>
  )
}

export default Menu;