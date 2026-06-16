import React, { useEffect, useState } from 'react';
import './ProjectDetail.css';

export const ProjectDetail = ({ projectId, setActivePage, setSelectedProjectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        
        const found = data.find(p => p.id === projectId);
        if (found) {
          setProject(found);
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div className="project-detail-container loading-message">Loading project details...</div>;
  }

  if (!project) {
    return (
      <div className="project-detail-container no-results">
        <p>Project not found.</p>
        <button className="back-btn" onClick={() => setActivePage('projects')}>
          &larr; Return to Showcase
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="detail-action-bar">
        <button className="back-btn" onClick={() => setActivePage('projects')}>
          &larr; Back to Showcase
        </button>
      </div>

      <div className="detail-hero">
        <img src={project.banner || project.thumbnail} alt="Banner" className="detail-hero-img" />
        <div className="detail-hero-overlay">
          <div className="detail-tags">
            <span className="detail-tag">{project.category}</span>
            <span className="detail-tag">{project.difficulty}</span>
          </div>
          <h1 className="detail-title">{project.title}</h1>
          <div className="detail-meta">
            <span>Duration: {project.duration}</span>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="main-pane">
          <div className="detail-panel">
            <h3 className="panel-title">Project Overview</h3>
            <p className="detail-text">{project.overview}</p>
            
            <h3 className="panel-title" style={{marginTop: '24px'}}>Full Description</h3>
            <p className="detail-text">{project.completeDescription}</p>
          </div>

          <div className="detail-panel">
            <h3 className="panel-title">Key Features</h3>
            <ul className="detail-list">
              {project.features?.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="detail-panel">
            <h3 className="panel-title">System Architecture & Modules</h3>
            <ul className="detail-list">
              {project.modules?.map((mod, idx) => (
                <li key={idx}>{mod}</li>
              ))}
            </ul>
          </div>

          {project.hardwareRequirements && project.hardwareRequirements.length > 0 && (
            <div className="detail-panel">
              <h3 className="panel-title">Hardware Requirements</h3>
              <ul className="detail-list">
                {project.hardwareRequirements.map((hw, idx) => (
                  <li key={idx}>{hw}</li>
                ))}
              </ul>
            </div>
          )}

          {project.softwareRequirements && project.softwareRequirements.length > 0 && (
            <div className="detail-panel">
              <h3 className="panel-title">Software Requirements</h3>
              <ul className="detail-list">
                {project.softwareRequirements.map((sw, idx) => (
                  <li key={idx}>{sw}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="detail-panel">
            <h3 className="panel-title">Installation & Setup</h3>
            <ul className="detail-list" style={{fontFamily: 'monospace', listStyleType: 'none', paddingLeft: 0}}>
              {project.installationSteps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="detail-panel">
            <h3 className="panel-title">Learning Outcomes</h3>
            <ul className="detail-list">
              {project.learningOutcomes?.map((lo, idx) => (
                <li key={idx}>{lo}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="side-pane">
          <div className="detail-panel">
            <button
              className="action-btn btn-primary"
              onClick={() => setActivePage('sourceCodeExplorer')}
            >
              View Source Code
            </button>
            <button className="action-btn btn-secondary" onClick={() => alert('Download started')}>
              Download Source Code
            </button>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn btn-secondary">
              GitHub Repository
            </a>
          </div>

          <div className="detail-panel">
            <h3 className="panel-title" style={{fontSize: '16px'}}>Technologies Used</h3>
            <div className="tech-badges">
              {project.technologyStack?.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          <div className="detail-panel">
            <h3 className="panel-title" style={{fontSize: '16px'}}>Repository Info</h3>
            <div className="repo-info-row">
              <div className="repo-stat">
                <div className="repo-stat-value">{project.repoInfo?.stars || 0}</div>
                <div className="repo-stat-label">Stars</div>
              </div>
              <div className="repo-stat" style={{borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)'}}>
                <div className="repo-stat-value">{project.repoInfo?.forks || 0}</div>
                <div className="repo-stat-label">Forks</div>
              </div>
              <div className="repo-stat">
                <div className="repo-stat-value">{project.repoInfo?.lastUpdated || 'Recently'}</div>
                <div className="repo-stat-label">Updated</div>
              </div>
            </div>
            
            <div style={{marginTop: '16px'}}>
              <div style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-text-secondary)'}}>Clone Repository</div>
              <div className="clone-box">
                git clone {project.githubUrl}.git
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
