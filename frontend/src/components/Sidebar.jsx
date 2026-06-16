import React from 'react';
import { LayoutGrid, Code2, FolderGit2, Trophy, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const MENU_ITEMS = [
  { name: 'Dashboard', path: 'dashboard', icon: LayoutGrid },
  { name: 'Problems', path: 'problems', icon: Code2 },
  { name: 'Projects', path: 'projects', icon: FolderGit2 },
  { name: 'Leaderboard', path: 'leaderboard', icon: Trophy },
  { name: 'Contests', path: 'contests', icon: Calendar },
];

export const Sidebar = ({ activePage, setActivePage, collapsed, setCollapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-menu">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.path;
          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.path)}
              className={`menu-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="menu-icon" size={20} />
              {!collapsed && (
                <span className="menu-text">{item.name}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

