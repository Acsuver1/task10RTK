import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`custom-sidebar ${isOpen ? 'open' : ''} ${!isOpen ? 'icons-only' : ''}`}>
        <ul className="navbar-list">
          <li>
            <NavLink to="/" exact activeClassName="active" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              {isOpen && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              {isOpen && <span>Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth/login" activeClassName="active" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
              {isOpen && <span>Login</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth/signup" activeClassName="active" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
              {isOpen && <span>Sign Up</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
