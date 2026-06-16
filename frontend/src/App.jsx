import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import './App.css';

// Pages
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { ProblemList } from './pages/ProblemList';
import { Workspace } from './pages/Workspace';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { VLSIProjectDetail } from './pages/VLSIProjectDetail';
import { SourceCodeExplorer } from './pages/SourceCodeExplorer';
import { Leaderboard } from './pages/Leaderboard';
import { Contests } from './pages/Contests';

const MainAppContent = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('auth');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState('1');
  const [selectedProjectId, setSelectedProjectId] = useState('1');

  // Route protection
  React.useEffect(() => {
    if (user && activePage === 'auth') {
      setActivePage('dashboard');
    } else if (!user && activePage !== 'auth') {
      setActivePage('auth');
    }
  }, [user, activePage]);

  // Auth routing render
  if (activePage === 'auth') {
    return <Auth setActivePage={setActivePage} />;
  }

  return (
    <div className="app-layout">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <div className="app-body">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        
        {/* Main page viewport, adjusts to sidebar size */}
        <main className={`app-main ${collapsed ? 'collapsed' : ''}`}>
          {activePage === 'dashboard' && (
            <Dashboard 
              setActivePage={setActivePage} 
              setSelectedProblemId={setSelectedProblemId} 
            />
          )}
          {activePage === 'problems' && (
            <ProblemList 
              setActivePage={setActivePage} 
              setSelectedProblemId={setSelectedProblemId} 
            />
          )}
          {activePage === 'workspace' && (
            <Workspace 
              problemId={selectedProblemId} 
              setActivePage={setActivePage} 
            />
          )}
          {activePage === 'projects' && (
            <Projects 
              setActivePage={setActivePage} 
              setSelectedProjectId={setSelectedProjectId} 
            />
          )}
          {activePage === 'projectDetail' && (
            <ProjectDetail 
              projectId={selectedProjectId} 
              setActivePage={setActivePage} 
              setSelectedProjectId={setSelectedProjectId}
            />
          )}
          {activePage === 'vlsiProjectDetail' && (
            <VLSIProjectDetail 
              projectId={selectedProjectId} 
              setActivePage={setActivePage} 
            />
          )}
          {activePage === 'sourceCodeExplorer' && (
            <SourceCodeExplorer
              projectId={selectedProjectId}
              setActivePage={setActivePage}
            />
          )}
          {activePage === 'leaderboard' && <Leaderboard />}
          {activePage === 'contests' && <Contests />}
        </main>
      </div>
    </div>
  );
};

export default MainAppContent;

