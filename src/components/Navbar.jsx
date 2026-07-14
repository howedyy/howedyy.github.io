import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img src="/logo.png" alt="Mohamed Howedy Logo" className="nav-logo-img" />
            </Link>
          </div>
          <div className="nav-actions">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/projects" className="nav-link">Case Studies</Link>
              <Link to="/contact" className="nav-link btn-nav-contact">Hire Me</Link>
            </div>
            <button className="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>
              <svg className="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: theme === 'light' ? 'none' : 'block' }}>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: theme === 'light' ? 'block' : 'none' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
            <button className="mobile-menu-btn" aria-label="Toggle Menu" onClick={toggleMenu} style={{ display: 'flex' }}>
              <span style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}></span>
              <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="mobile-link" onClick={closeMenu}>About</Link>
        <Link to="/services" className="mobile-link" onClick={closeMenu}>Services</Link>
        <Link to="/projects" className="mobile-link" onClick={closeMenu}>Case Studies</Link>
        <Link to="/contact" className="mobile-link" onClick={closeMenu}>Hire Me</Link>
      </div>
    </>
  );
};

export default Navbar;
