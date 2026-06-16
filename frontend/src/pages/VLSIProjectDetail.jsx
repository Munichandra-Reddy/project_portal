import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  CheckCircle, 
  Download, 
  PlayCircle,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import './VLSIProjectDetail.css';
import { generateProjectPDF } from '../utils/pdfGenerator';

const TABS = [
  { id: 'abstract', label: 'Read Abstract', icon: FileText },
  { id: 'diagram', label: 'Block Diagram', icon: ImageIcon },
  { id: 'specs', label: 'Specifications', icon: Settings },
  { id: 'outcomes', label: 'Learning Outcomes', icon: CheckCircle },
  { id: 'download', label: 'Download Abstract', icon: Download },
  { id: 'demo', label: 'Demo Video', icon: PlayCircle }
];

export const VLSIProjectDetail = ({ projectId, setActivePage }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('abstract');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        
        const found = data.find(p => p.id === projectId);
        if (found) setProject(found);
        else setProject(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div className="vlsi-portal-container loading-message">Loading project details...</div>;
  if (!project) {
    return (
      <div className="vlsi-portal-container no-results">
        <p>Project not found.</p>
        <button className="portal-back-btn" onClick={() => setActivePage('projects')}>
          &larr; Return to Showcase
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'abstract':
        return (
          <div className="portal-pane fade-in">
            <div className="pane-header">
              <h2>{project.title}</h2>
              <span className="project-code-badge">{project.projectCode || 'VLSI-000'}</span>
            </div>
            <div className="abstract-meta">
              <span className="meta-item"><strong>Tech Stack:</strong> {project.technologiesUsed}</span>
              <span className="meta-item"><strong>Difficulty:</strong> {project.difficulty}</span>
            </div>
            <div className="abstract-content">
              <h3>Full Abstract</h3>
              <p>{project.abstract}</p>
            </div>
          </div>
        );
      case 'diagram':
        return (
          <div className="portal-pane fade-in">
             <div className="pane-header">
              <h2>Block Diagram</h2>
              <span className="project-code-badge">{project.projectCode || 'VLSI-000'}</span>
            </div>
            <div className="diagram-wrapper">
              <img src={project.blockDiagram} alt="Block Diagram" className="block-diagram-img" />
              <button className="zoom-btn" onClick={() => setShowImageModal(true)}>
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        );
      case 'specs':
        return (
          <div className="portal-pane fade-in">
            <h2>System Specifications</h2>
            <div className="specs-table-container">
              <table className="specs-table">
                <tbody>
                  {project.specifications && Object.entries(project.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'outcomes':
        return (
          <div className="portal-pane fade-in">
            <h2>Learning Outcomes</h2>
            <div className="outcomes-grid">
              {project.learningOutcomes?.map((outcome, idx) => (
                <div className="outcome-card" key={idx}>
                  <CheckCircle className="outcome-icon" size={24} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'download':
        return (
          <div className="portal-pane fade-in">
            <h2>Download Project Resources</h2>
            <div className="download-actions">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  generateProjectPDF(project);
                }} 
                className="dl-btn pdf-btn"
              >
                <FileText size={20} />
                Download PDF
              </a>
              <a href={project.docDownloadUrl} download className="dl-btn doc-btn">
                <FileText size={20} />
                Download DOC
              </a>
              <a href={project.pdfDownloadUrl} target="_blank" rel="noopener noreferrer" className="dl-btn preview-btn">
                <Settings size={20} />
                Preview Abstract
              </a>
            </div>
          </div>
        );
      case 'demo':
        return (
          <div className="portal-pane fade-in">
            <h2>Project Demonstration</h2>
            <div className="video-container">
              {project.demoVideoUrl ? (
                <iframe 
                  src={project.demoVideoUrl} 
                  title="Demo Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="no-video">Video Not Available</div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="vlsi-portal-container">
      <button className="portal-back-btn top-back" onClick={() => setActivePage('projects')}>
        &larr; Back to Projects
      </button>
      
      <div className="portal-layout">
        {/* Left Sidebar Menu */}
        <aside className="portal-sidebar">
          <div className="sidebar-header">
            <h3>VLSI Project Menu</h3>
          </div>
          <nav className="sidebar-nav">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-label">{tab.label}</span>
                  {isActive && <ArrowRight size={18} className="active-arrow" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="portal-content">
          {renderContent()}
        </main>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
          <button className="modal-close-btn" onClick={() => setShowImageModal(false)}>
            <X size={32} />
          </button>
          <img src={project.blockDiagram} alt="Full Screen Diagram" className="modal-img" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};
