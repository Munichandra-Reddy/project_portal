import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import { 
  Search, CheckCircle2, Circle, ArrowLeft, ArrowRight,
  RotateCcw, HelpCircle, Code2, Tag, Bookmark
} from 'lucide-react';
import './ProblemList.css';

export const ProblemList = ({ setActivePage, setSelectedProblemId }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [solvedStatus, setSolvedStatus] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [acceptanceRate, setAcceptanceRate] = useState('');
  const [sort, setSort] = useState('ascId');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  const toast = useToast();

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const data = await api.getProblems({
        search,
        difficulty,
        solvedStatus,
        tag: selectedTag,
        acceptanceRate,
        sort,
        page,
        limit
      });
      setProblems(data.problems);
      setTotalPages(data.pagination.totalPages);
      setTotalProblems(data.pagination.total);
      setSolvedCount(data.solvedCount);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load coding problems database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page, difficulty, solvedStatus, selectedTag, acceptanceRate, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProblems();
  };

  const handleResetFilters = () => {
    setSearch('');
    setDifficulty('');
    setSolvedStatus('');
    setSelectedTag('');
    setAcceptanceRate('');
    setSort('ascId');
    setPage(1);
  };

  const handleBookmarkToggle = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await api.toggleBookmark(id);
      setProblems(prev => prev.map(p => p.id === id ? { ...p, bookmarked: res.bookmarked } : p));
      toast.success(res.bookmarked ? 'Problem bookmarked!' : 'Bookmark removed.');
    } catch (err) {
      toast.error('Failed to toggle bookmark');
    }
  };

  const startProblem = (problemId) => {
    setSelectedProblemId(problemId);
    setActivePage('workspace');
  };

  // Tags suggestions based on typical topics
  const POPULAR_TAGS = ['Array', 'String', 'Math', 'Dynamic Programming', 'Tree', 'Linked List', 'Binary Search', 'Sorting', 'Stack'];

  return (
    <div className="page-wrapper problem-list-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Coding Problem Directory</h1>
          <p className="page-subtitle">Practice concepts from over 100 seeded algorithmic challenges.</p>
        </div>
        <div>
          <span className="header-stats">
            Solved: {solvedCount} / {totalProblems} ({totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0}%)
          </span>
        </div>
      </div>

      {/* Filters Area */}
      <div className="filters-area">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems by name or keyword..."
            className="search-input"
          />
          <button type="submit" className="search-btn">Find</button>
        </form>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Solved Status */}
        <select
          value={solvedStatus}
          onChange={(e) => { setSolvedStatus(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>

        {/* Acceptance Rate */}
        <select
          value={acceptanceRate}
          onChange={(e) => { setAcceptanceRate(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="">Any Acc. Rate</option>
          <option value="90">≥ 90%</option>
          <option value="70">≥ 70%</option>
          <option value="50">≥ 50%</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="ascId">ID (Asc)</option>
          <option value="descId">ID (Desc)</option>
          <option value="difficulty">Difficulty</option>
          <option value="acceptanceRate">Acceptance Rate</option>
        </select>
      </div>

      {/* Quick Tag Badges */}
      <div className="tags-area">
        <span className="tags-label"><Tag size={14} /> Popular Tags:</span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTag(selectedTag === tag ? '' : tag);
              setPage(1);
            }}
            className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
          >
            {tag}
          </button>
        ))}
        {(search || difficulty || solvedStatus || selectedTag) && (
          <button onClick={handleResetFilters} className="clear-filters-btn">
            <RotateCcw size={12} /> Clear Filters
          </button>
        )}
      </div>

      {/* Problems list area */}
      <div className="problems-table-container">
        {loading ? (
          <div className="loading-skeleton">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-row" />
            ))}
          </div>
        ) : problems.length === 0 ? (
          <div className="empty-state">
            <HelpCircle size={48} color="var(--color-border)" />
            <h3 className="empty-state-title">No problems found</h3>
            <p className="empty-state-subtitle">
              Try adjusting your query or resetting filters to view other coding challenges.
            </p>
          </div>
        ) : (
          <table className="problems-table">
            <thead>
              <tr>
                <th style={{ width: '80px', paddingLeft: '24px' }}>Status</th>
                <th>Title</th>
                <th style={{ width: '120px' }}>Difficulty</th>
                <th style={{ width: '120px' }}>Acc. Rate</th>
                <th>Category</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((prob) => (
                <tr key={prob.id} onClick={() => startProblem(prob.id)} className="problem-row">
                  {/* Status Column */}
                  <td className="status-cell" style={{ paddingLeft: '24px' }}>
                    {prob.solved ? (
                      <CheckCircle2 className="status-solved" size={20} />
                    ) : (
                      <Circle className="status-unsolved" size={20} />
                    )}
                  </td>

                  {/* ID & Title */}
                  <td>
                    <div className="title-cell">
                      <span className="title-text">{prob.id}. {prob.title}</span>
                      <button
                        onClick={(e) => handleBookmarkToggle(e, prob.id)}
                        className={`bookmark-btn ${prob.bookmarked ? 'bookmarked' : ''}`}
                      >
                        <Bookmark size={16} fill={prob.bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </td>

                  {/* Difficulty Column */}
                  <td>
                    <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </td>

                  {/* Acc Rate Column */}
                  <td>
                    <span className="acc-rate">
                      {prob.acceptanceRate ? `${prob.acceptanceRate}%` : 'N/A'}
                    </span>
                  </td>

                  {/* Category Column */}
                  <td>
                    <div className="category-tags">
                      {prob.tags && prob.tags.filter(t => t !== prob.difficulty).map(tag => (
                        <span key={tag} className="category-tag">{tag}</span>
                      ))}
                    </div>
                  </td>

                  {/* Code Action Column */}
                  <td className="action-cell">
                    <span className="action-icon">
                      <Code2 size={16} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <span className="pagination-text">
            Showing Page {page} of {totalPages} ({totalProblems} Total Problems)
          </span>
          <div className="pagination-btns">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="page-btn"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="page-btn"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

