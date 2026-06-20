import React from 'react';
import { LogOut, User, FolderGit2 } from 'lucide-react';
import logoUrl from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Brand logo */}
        <button 
          onClick={() => setActivePage('dashboard')} 
          className="navbar-brand"
        >
          <div className="brand-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logoUrl} alt="Logo" style={{ width: '40px', height: '40px' }} />
          </div>
          <span className="brand-title">Geonixa Project Portal</span>
        </button>

        {/* Main Navigation Links */}
        <div className="navbar-nav">
          <button
            onClick={() => setActivePage('projects')}
            className={`nav-link ${activePage === 'projects' || activePage === 'projectDetail' ? 'active' : ''}`}
          >
            <FolderGit2 size={16} />
            Projects
          </button>
        </div>
      </div>

      {/* Right control cluster */}
      <div className="navbar-right">
        {/* User Session Handler */}
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              <User size={16} />
            </div>
            <div className="user-info">
              <span className="user-name">
                {user.username === 'guest' ? 'Guest' : user.username}
              </span>
              <span className="user-role">
                {user.username === 'guest' ? 'Temporary' : 'Developer'}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                setActivePage('auth');
              }}
              className="logout-btn"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

