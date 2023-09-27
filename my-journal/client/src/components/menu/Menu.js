import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const handleLinkClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    // Update the activePage state when the location changes
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div className='menu'>
      <ul className='menuList'>
        <li>
          <Link
            to="/"
            className={`menu-link ${activePage === '/' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/')}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/my-journals"
            className={`menu-link ${activePage.startsWith('/my-journals') ? 'active' : ''}`}
            onClick={() => handleLinkClick('/my-journals')}
          >
            Journals
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={`menu-link ${activePage.startsWith('/favorites') ? 'active' : ''}`}
            onClick={() => handleLinkClick('/favorites')}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
