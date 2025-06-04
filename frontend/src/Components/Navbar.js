import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector(state => state?.auth?.user?.role);
    const dispatch=useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Store Management
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger-lines ${isOpen ? 'active' : ''}`}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {userRole === 'admin' && (
            <>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/stores" className="nav-link">
                  Stores
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/ratings" className="nav-link">
                  Ratings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/create-user" className="nav-link">
                  Create User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/create-store" className="nav-link">
                  Create Store
                </Link>
              </li>
            </>
          )}
          
          {userRole === 'store_owner' && (
            <li className="nav-item">
              <Link to="/store_owner/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
          
          {userRole === 'normal' && (
            <li className="nav-item">
              <Link to="/normal/dashboard" className="nav-link">
                Home
              </Link>
            </li>
          )}
          {userRole?.length>0 && (
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;