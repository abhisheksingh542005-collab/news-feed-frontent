import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    return navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '2rem'
    }}>
      <div>
        <Link to="/news" style={{ fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none', color: '#1e293b' }}>
          📰 TechNews Hub
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/news" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>
          Feed
        </Link>
        <Link to="/bookmarks" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>
          Bookmarks 📌
        </Link>
        <button onClick={handleLogout} style={{
          background: 'transparent',
          border: '1px solid #cbd5e1',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;