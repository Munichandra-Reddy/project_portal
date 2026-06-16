import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import { 
  Trophy, Flame, Code2, FolderKanban, 
  ArrowRight, ExternalLink, Bookmark, CheckCircle2, Circle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export const Dashboard = ({ setActivePage, setSelectedProblemId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="page-wrapper dashboard-page" style={{ opacity: 0.5 }}>
        <div style={{ height: '40px', width: '200px', backgroundColor: 'var(--color-sidebar)', borderRadius: 'var(--border-radius)' }} />
        <div className="metrics-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ height: '112px', backgroundColor: 'var(--color-sidebar)', borderRadius: 'var(--border-radius)' }} />
          ))}
        </div>
        <div className="analytics-grid">
          <div style={{ height: '320px', backgroundColor: 'var(--color-sidebar)', borderRadius: 'var(--border-radius)' }} />
          <div style={{ height: '320px', backgroundColor: 'var(--color-sidebar)', borderRadius: 'var(--border-radius)' }} />
        </div>
      </div>
    );
  }

  const {
    streak = 0,
    solvedCount = 0,
    attemptedCount = 0,
    totals = { all: 0, easy: 0, medium: 0, hard: 0 },
    solved = { easy: 0, medium: 0, hard: 0 },
    activity = [],
    recentlyViewed = [],
    bookmarked = [],
    projectProgress = 66
  } = stats || {};

  const solvePercentage = totals.all > 0 ? Math.round((solvedCount / totals.all) * 100) : 0;

  const navigateToProblem = (problemId) => {
    setSelectedProblemId(problemId);
    setActivePage('workspace');
  };

  return (
    <div className="page-wrapper dashboard-page">
      {/* Welcome header */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Developer Workspace</h1>
          <p className="page-subtitle">Build coding streaks and showcase project structures.</p>
        </div>
        <button
          onClick={() => setActivePage('problems')}
          className="btn-primary"
          style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          Browse Problems
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Numerical dashboard cards */}
      <div className="metrics-grid">
        {/* Streak card */}
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Current Streak</span>
            <span className="metric-value">{streak} Days</span>
            <span className="metric-subtext">Solve daily to build points</span>
          </div>
          <div className="metric-icon-wrapper streak">
            <Flame size={24} />
          </div>
        </div>

        {/* Solved ratio card */}
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Problems Solved</span>
            <span className="metric-value">
              {solvedCount} <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>/ {totals.all}</span>
            </span>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${solvePercentage}%`, backgroundColor: 'var(--color-btn)' }} />
            </div>
          </div>
          <div className="metric-icon-wrapper solved">
            <Code2 size={24} />
          </div>
        </div>

        {/* Attempted card */}
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Problems Attempted</span>
            <span className="metric-value">{attemptedCount}</span>
            <span className="metric-subtext">Keep debugging failures!</span>
          </div>
          <div className="metric-icon-wrapper attempted">
            <Trophy size={24} />
          </div>
        </div>

        {/* Project progress card */}
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Project Showcase</span>
            <span className="metric-value">{projectProgress}%</span>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${projectProgress}%`, backgroundColor: 'var(--color-easy)' }} />
            </div>
          </div>
          <div className="metric-icon-wrapper project">
            <FolderKanban size={24} />
          </div>
        </div>
      </div>

      {/* Main analytics section */}
      <div className="analytics-grid">
        
        {/* Chart area */}
        <div className="chart-card">
          <div>
            <h3 className="card-title">Submission Activity</h3>
            <p className="card-subtitle">Total compile runs & submissions completed this week</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-btn)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--color-btn)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--color-sidebar)', 
                    borderColor: 'var(--color-border)', 
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--color-text-primary)' 
                  }} 
                />
                <Area type="monotone" dataKey="submissions" stroke="var(--color-btn)" strokeWidth={2} fillOpacity={1} fill="url(#colorSub)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty stats panel */}
        <div className="breakdown-card">
          <div>
            <h3 className="card-title">Progress Breakdown</h3>
            <p className="card-subtitle">Solved distribution by difficulty level</p>
          </div>

          <div className="breakdown-list">
            {/* Easy */}
            <div className="breakdown-item">
              <div className="breakdown-header easy">
                <span>Easy</span>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {solved.easy} <span style={{ color: 'var(--color-text-secondary)' }}>/ {totals.easy}</span>
                </span>
              </div>
              <div className="breakdown-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${totals.easy > 0 ? (solved.easy / totals.easy) * 100 : 0}%`, backgroundColor: 'var(--color-easy)' }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="breakdown-item">
              <div className="breakdown-header medium">
                <span>Medium</span>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {solved.medium} <span style={{ color: 'var(--color-text-secondary)' }}>/ {totals.medium}</span>
                </span>
              </div>
              <div className="breakdown-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${totals.medium > 0 ? (solved.medium / totals.medium) * 100 : 0}%`, backgroundColor: 'var(--color-medium)' }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="breakdown-item">
              <div className="breakdown-header hard">
                <span>Hard</span>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {solved.hard} <span style={{ color: 'var(--color-text-secondary)' }}>/ {totals.hard}</span>
                </span>
              </div>
              <div className="breakdown-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${totals.hard > 0 ? (solved.hard / totals.hard) * 100 : 0}%`, backgroundColor: 'var(--color-hard)' }}
                />
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
            Solve Hard-tier items to earn extra rank points.
          </div>
        </div>
      </div>

      {/* Recently viewed and bookmarks split */}
      <div className="lists-grid">
        {/* Recently viewed list */}
        <div className="list-card">
          <h3 className="card-title">Recently Viewed</h3>
          <div className="list-content">
            {recentlyViewed.length === 0 ? (
              <div className="empty-list-msg">No recently viewed problems. Start coding!</div>
            ) : (
              recentlyViewed.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => navigateToProblem(prob.id)}
                  className="list-item"
                >
                  <div className="list-item-left">
                    {prob.solved ? (
                      <CheckCircle2 size={16} color="var(--color-easy)" />
                    ) : (
                      <Circle size={16} color="var(--color-text-secondary)" />
                    )}
                    <span className="list-item-title">
                      {prob.id}. {prob.title}
                    </span>
                  </div>
                  <div className="list-item-right">
                    <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                    <ExternalLink size={16} color="var(--color-text-secondary)" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Bookmarked list */}
        <div className="list-card">
          <h3 className="card-title">
            <Bookmark size={20} color="var(--color-btn)" />
            Bookmarked List
          </h3>
          <div className="list-content">
            {bookmarked.length === 0 ? (
              <div className="empty-list-msg">Bookmarks will appear here. Click the bookmark icon inside problem pages!</div>
            ) : (
              bookmarked.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => navigateToProblem(prob.id)}
                  className="list-item"
                >
                  <div className="list-item-left">
                    {prob.solved ? (
                      <CheckCircle2 size={16} color="var(--color-easy)" />
                    ) : (
                      <Circle size={16} color="var(--color-text-secondary)" />
                    )}
                    <span className="list-item-title">
                      {prob.id}. {prob.title}
                    </span>
                  </div>
                  <div className="list-item-right">
                    <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                    <ExternalLink size={16} color="var(--color-text-secondary)" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
