import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './SourceCodeExplorer.css';

// ─── Syntax Highlighter ──────────────────────────────────────────────────────
const highlight = (code, lang) => {
  if (!code) return '';
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'java') {
    const keywords = ['public','private','protected','static','final','void','class','interface','extends','implements','import','package','new','return','if','else','for','while','do','switch','case','break','continue','try','catch','finally','throw','throws','this','super','null','true','false','int','long','double','float','boolean','char','byte','short','String','Object','List','Map','Set','ArrayList','HashMap','abstract','synchronized','volatile','transient','native','strictfp','enum','assert','instanceof','default'];
    keywords.forEach(kw => {
      escaped = escaped.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="sce-kw">${kw}</span>`);
    });
    escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="sce-comment">$1</span>');
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sce-comment">$1</span>');
    escaped = escaped.replace(/(".*?")/g, '<span class="sce-string">$1</span>');
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="sce-num">$1</span>');
  } else if (lang === 'sql') {
    const keywords = ['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DROP','ALTER','ADD','PRIMARY','KEY','FOREIGN','REFERENCES','INDEX','JOIN','LEFT','RIGHT','INNER','OUTER','ON','AND','OR','NOT','NULL','DEFAULT','AUTO_INCREMENT','INT','VARCHAR','TEXT','DATE','DATETIME','BOOLEAN','CONSTRAINT','UNIQUE','GROUP','BY','ORDER','HAVING','LIMIT','OFFSET','AS','DISTINCT'];
    keywords.forEach(kw => {
      escaped = escaped.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `<span class="sce-kw">${kw}</span>`);
    });
    escaped = escaped.replace(/(--[^\n]*)/g, '<span class="sce-comment">$1</span>');
    escaped = escaped.replace(/('.*?')/g, '<span class="sce-string">$1</span>');
  } else if (lang === 'xml' || lang === 'html') {
    escaped = escaped.replace(/(&lt;\/?[\w:-]+)/g, '<span class="sce-tag">$1</span>');
    escaped = escaped.replace(/([\w-]+=)(".*?")/g, '<span class="sce-attr">$1</span><span class="sce-string">$2</span>');
    escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="sce-comment">$1</span>');
  } else if (lang === 'js' || lang === 'json') {
    escaped = escaped.replace(/(".*?")/g, '<span class="sce-string">$1</span>');
    escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="sce-comment">$1</span>');
    escaped = escaped.replace(/\b(const|let|var|function|return|if|else|for|while|import|export|default|class|new|this|async|await|true|false|null|undefined)\b/g, '<span class="sce-kw">$1</span>');
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="sce-num">$1</span>');
  }
  return escaped;
};

const getLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    java: 'java', sql: 'sql', xml: 'xml', html: 'html', htm: 'html',
    js: 'js', jsx: 'js', ts: 'js', tsx: 'js', json: 'json',
    css: 'css', md: 'md', txt: 'txt', yml: 'yml', yaml: 'yml',
    properties: 'txt', sh: 'txt', bat: 'txt', gradle: 'txt',
  };
  return map[ext] || 'txt';
};

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const iconMap = {
    java: '☕', sql: '🗄️', xml: '📄', html: '🌐', htm: '🌐',
    js: '📜', jsx: '⚛️', ts: '📘', tsx: '⚛️', json: '📋',
    css: '🎨', md: '📝', txt: '📃', yml: '⚙️', yaml: '⚙️',
    gradle: '🔧', properties: '⚙️', sh: '💻', bat: '💻',
  };
  return iconMap[ext] || '📄';
};

// ─── Build File Tree from sourceFiles array ──────────────────────────────────
const buildTree = (sourceFiles) => {
  const root = {};
  (sourceFiles || []).forEach(file => {
    const pathStr = file.path || file.name;
    const parts = pathStr.split('/');
    let node = root;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        node[part] = { _file: true, content: file.content, path: pathStr, name: part };
      } else {
        if (!node[part]) node[part] = {};
        node = node[part];
      }
    });
  });
  return root;
};

// ─── File Tree Node ───────────────────────────────────────────────────────────
const TreeNode = ({ name, node, depth, onFileClick, selectedPath }) => {
  const [expanded, setExpanded] = useState(depth === 0);
  const isFile = node._file === true;
  const indent = depth * 20;

  if (isFile) {
    return (
      <div
        className={`sce-tree-item sce-file ${selectedPath === node.path ? 'selected' : ''}`}
        style={{ paddingLeft: `${indent + 20}px` }}
        onClick={() => onFileClick(node)}
      >
        <span className="sce-tree-icon">{getFileIcon(name)}</span>
        <span className="sce-tree-name">{name}</span>
      </div>
    );
  }

  const children = Object.entries(node).filter(([k]) => k !== '_file');
  return (
    <div>
      <div
        className="sce-tree-item sce-folder"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => setExpanded(e => !e)}
      >
        <span className="sce-tree-chevron">{expanded ? '▾' : '▸'}</span>
        <span className="sce-tree-icon">📁</span>
        <span className="sce-tree-name">{name}</span>
      </div>
      {expanded && children.map(([k, v]) => (
        <TreeNode
          key={k}
          name={k}
          node={v}
          depth={depth + 1}
          onFileClick={onFileClick}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
};

// ─── Markdown Renderer ────────────────────────────────────────────────────────
const MarkdownView = ({ content }) => {
  const html = useMemo(() => {
    if (!content) return '';
    let h = content
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^######\s(.+)/gm, '<h6>$1</h6>')
      .replace(/^#####\s(.+)/gm, '<h5>$1</h5>')
      .replace(/^####\s(.+)/gm, '<h4>$1</h4>')
      .replace(/^###\s(.+)/gm, '<h3>$1</h3>')
      .replace(/^##\s(.+)/gm, '<h2>$1</h2>')
      .replace(/^#\s(.+)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/^\-\s(.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');
    return `<p>${h}</p>`;
  }, [content]);
  return <div className="sce-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
};

// ─── Code Viewer Panel ────────────────────────────────────────────────────────
const CodeViewer = ({ file, onClose }) => {
  const lang = getLanguage(file.name);
  const lines = (file.content || '').split('\n');
  const isMarkdown = lang === 'md';

  return (
    <div className="sce-code-viewer">
      <div className="sce-code-header">
        <div className="sce-code-meta">
          <span className="sce-code-icon">{getFileIcon(file.name)}</span>
          <div>
            <div className="sce-code-filename">{file.name}</div>
            <div className="sce-code-path">{file.path}</div>
          </div>
        </div>
        <div className="sce-code-actions">
          <span className="sce-lang-badge">{lang.toUpperCase()}</span>
          <span className="sce-lines-badge">{lines.length} lines</span>
          <button className="sce-close-btn" onClick={onClose}>✕ Close</button>
        </div>
      </div>

      {isMarkdown ? (
        <div className="sce-markdown-wrapper">
          <MarkdownView content={file.content} />
        </div>
      ) : (
        <div className="sce-code-body">
          <table className="sce-code-table">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="sce-code-row">
                  <td className="sce-line-num">{i + 1}</td>
                  <td
                    className="sce-line-code"
                    dangerouslySetInnerHTML={{
                      __html: highlight(line, lang) || '&nbsp;'
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Repository Explorer (file tree + code viewer) ───────────────────────────
const RepoExplorer = ({ project, onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const tree = useMemo(() => buildTree(project.sourceFiles), [project]);

  const readmeFile = useMemo(() => {
    return (project.sourceFiles || []).find(f =>
      (f.path || f.name).toLowerCase() === 'readme.md' ||
      (f.path || f.name).toLowerCase().endsWith('/readme.md')
    );
  }, [project]);

  const repoName = project.githubUrl
    ? project.githubUrl.split('/').slice(-1)[0]
    : project.title.toLowerCase().replace(/\s+/g, '-');

  const ownerName = project.githubUrl
    ? project.githubUrl.split('/').slice(-2, -1)[0]
    : 'Geonixa';

  return (
    <div className="sce-repo-explorer">
      {/* Repo Header */}
      <div className="sce-repo-header">
        <button className="sce-back-btn" onClick={onBack}>
          ← Back to Projects
        </button>
        <div className="sce-repo-breadcrumb">
          <span className="sce-breadcrumb-owner">{ownerName}</span>
          <span className="sce-breadcrumb-sep">/</span>
          <span className="sce-breadcrumb-repo">{repoName}</span>
        </div>
        <div className="sce-repo-desc">{project.shortDescription}</div>
        <div className="sce-repo-meta">
          <span className="sce-repo-badge">⭐ {project.repoInfo?.stars || 0}</span>
          <span className="sce-repo-badge">🍴 {project.repoInfo?.forks || 0}</span>
          <span className="sce-repo-badge">📅 {project.repoInfo?.lastUpdated || 'Recently'}</span>
          <div className="sce-tech-chips">
            {(project.technologyStack || []).map(t => (
              <span key={t} className="sce-tech-chip">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Clone Bar */}
      <div className="sce-clone-bar">
        <span className="sce-clone-label">🔗 Clone:</span>
        <code className="sce-clone-code">git clone {project.githubUrl || ''}.git</code>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sce-gh-btn"
        >
          GitHub ↗
        </a>
      </div>

      {/* Main Explorer Area */}
      <div className={`sce-explorer-body ${selectedFile ? 'with-viewer' : ''}`}>
        {/* Left: File Tree */}
        <div className="sce-file-tree">
          <div className="sce-tree-header">
            <span>📂 Repository Files</span>
            <span className="sce-file-count">
              {(project.sourceFiles || []).length} files
            </span>
          </div>
          {Object.keys(tree).length === 0 ? (
            <div className="sce-no-files">No source files available for this repository.</div>
          ) : (
            Object.entries(tree).map(([k, v]) => (
              <TreeNode
                key={k}
                name={k}
                node={v}
                depth={0}
                onFileClick={setSelectedFile}
                selectedPath={selectedFile?.path}
              />
            ))
          )}
        </div>

        {/* Right: Code Viewer or README */}
        {selectedFile ? (
          <CodeViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
        ) : readmeFile ? (
          <div className="sce-readme-panel">
            <div className="sce-readme-header">📝 README.md</div>
            <MarkdownView content={readmeFile.content} />
          </div>
        ) : (
          <div className="sce-readme-panel sce-empty-hint">
            <p>👈 Click any file in the tree to view its source code.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Project List View (all Java projects) ────────────────────────────────────
const ProjectListView = ({ projects, onViewRepo, onBack }) => {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() =>
    projects.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.technologyStack || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
    ),
    [projects, search]
  );

  return (
    <div className="sce-project-list">
      <button className="sce-back-btn" onClick={onBack}>← Back to Explorer</button>
      <h2 className="sce-list-title">☕ Java Projects</h2>
      <p className="sce-list-sub">{projects.length} repositories available</p>

      <div className="sce-list-search">
        <input
          type="text"
          placeholder="Search projects or technologies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="sce-no-results">No projects match your search.</div>
      ) : (
        <div className="sce-project-cards">
          {filtered.map(p => (
            <div key={p.id} className="sce-project-card">
              <div className="sce-card-left">
                <h3 className="sce-card-title">{p.title}</h3>
                <p className="sce-card-desc">{p.shortDescription}</p>
                <div className="sce-card-techs">
                  {(p.technologyStack || []).map(t => (
                    <span key={t} className="sce-tech-chip">{t}</span>
                  ))}
                </div>
                <div className="sce-card-url">
                  <span className="sce-url-label">📦 Source:</span>
                  <a
                    href={p.sourceCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sce-url-link"
                  >
                    {p.sourceCodeUrl}
                  </a>
                </div>
              </div>
              <div className="sce-card-right">
                <div className="sce-card-stats">
                  <span>⭐ {p.repoInfo?.stars || 0}</span>
                  <span>🍴 {p.repoInfo?.forks || 0}</span>
                </div>
                <button
                  className="sce-view-repo-btn"
                  onClick={() => onViewRepo(p)}
                >
                  📂 View Repository
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = ({ allProjects, onCategoryClick, onBack }) => {
  const javaCount = useMemo(() =>
    allProjects.filter(p =>
      p.category === 'Java Projects' ||
      (p.technologyStack || []).some(t => t.toLowerCase() === 'java')
    ).length,
    [allProjects]
  );

  const categories = [
    { id: 'java', label: 'Java', icon: '☕', desc: 'Java-based enterprise and desktop applications', count: javaCount },
  ];

  return (
    <div className="sce-landing">
      <button className="sce-back-btn" onClick={onBack}>← Back to Project</button>

      <div className="sce-landing-hero">
        <div className="sce-landing-icon">{'</>'}</div>
        <h1 className="sce-landing-title">Projects With Source Code</h1>
        <p className="sce-landing-desc">
          Browse complete repository structures, source files, and documentation
          for all engineering projects. Click a category to explore.
        </p>
      </div>

      <div className="sce-stats-row">
        <div className="sce-stat-card">
          <div className="sce-stat-val">{allProjects.length}</div>
          <div className="sce-stat-label">Total Projects</div>
        </div>
        <div className="sce-stat-card">
          <div className="sce-stat-val">{javaCount}</div>
          <div className="sce-stat-label">Java Repositories</div>
        </div>
        <div className="sce-stat-card">
          <div className="sce-stat-val">
            {allProjects.reduce((acc, p) => acc + (p.sourceFiles?.length || 0), 0)}
          </div>
          <div className="sce-stat-label">Source Files</div>
        </div>
      </div>

      <h2 className="sce-section-heading">Types of Projects</h2>
      <div className="sce-category-grid">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="sce-category-card"
            onClick={() => onCategoryClick(cat.id)}
          >
            <div className="sce-cat-icon">{cat.icon}</div>
            <div className="sce-cat-info">
              <div className="sce-cat-label">{cat.label}</div>
              <div className="sce-cat-desc">{cat.desc}</div>
            </div>
            <div className="sce-cat-count">{cat.count} repos</div>
            <span className="sce-cat-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────
export const SourceCodeExplorer = ({ projectId, setActivePage }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('landing'); // 'landing' | 'list' | 'repo'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [repoUnavailable, setRepoUnavailable] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setAllProjects(data);

        // If we arrived from a specific project's "View Source Code", go straight to repo
        if (projectId) {
          const p = data.find(x => x.id === projectId);
          if (p) {
            if (p.sourceFiles && p.sourceFiles.length > 0) {
              setSelectedProject(p);
              setView('repo');
            } else {
              setRepoUnavailable(true);
              setView('landing');
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [projectId]);

  const javaProjects = useMemo(() =>
    allProjects.filter(p =>
      p.category === 'Java Projects' ||
      (p.technologyStack || []).some(t => t.toLowerCase() === 'java')
    ),
    [allProjects]
  );

  const handleCategoryClick = useCallback((catId) => {
    setSelectedCategory(catId);
    setView('list');
  }, []);

  const handleViewRepo = useCallback((proj) => {
    if (!proj.sourceFiles || proj.sourceFiles.length === 0) {
      setRepoUnavailable(true);
      return;
    }
    setSelectedProject(proj);
    setView('repo');
    setRepoUnavailable(false);
  }, []);

  if (loading) {
    return (
      <div className="sce-root">
        <div className="sce-loading">⏳ Loading repositories...</div>
      </div>
    );
  }

  return (
    <div className="sce-root">
      {repoUnavailable && (
        <div className="sce-repo-unavailable">
          ⚠️ Repository not available — the source files for this project have not been added yet.
          <button onClick={() => setRepoUnavailable(false)}>✕</button>
        </div>
      )}

      {view === 'landing' && (
        <LandingPage
          allProjects={allProjects}
          onCategoryClick={handleCategoryClick}
          onBack={() => setActivePage('projectDetail')}
        />
      )}

      {view === 'list' && selectedCategory === 'java' && (
        <ProjectListView
          projects={javaProjects}
          onViewRepo={handleViewRepo}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'repo' && selectedProject && (
        <RepoExplorer
          project={selectedProject}
          onBack={() => {
            if (selectedCategory) setView('list');
            else setView('landing');
          }}
        />
      )}
    </div>
  );
};
