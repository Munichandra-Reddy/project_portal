import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import confetti from 'canvas-confetti';
import { 
  Play, Send, Maximize2, Minimize2, Bookmark, CheckCircle, 
  ChevronDown, Save, MessageSquare, Sparkles, XCircle, ArrowLeft
} from 'lucide-react';
import './Workspace.css';

export const Workspace = ({ problemId, setActivePage }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  
  // Resizable Panels State
  const [splitWidth, setSplitWidth] = useState(50); // percentage for left panel
  const isResizing = useRef(false);
  const containerRef = useRef(null);

  // Layout states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leftTab, setLeftTab] = useState('description');
  const [rightTab, setRightTab] = useState('testcases');
  
  // Compiler State
  const [customInput, setCustomInput] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [runResult, setRunResult] = useState(null);
  
  // Notes State
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  
  // Discussions State
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // AI Hints State
  const [aiHint, setAiHint] = useState('');
  const [generatingAiHint, setGeneratingAiHint] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchProblemData = async () => {
      setLoading(true);
      try {
        const data = await api.getProblem(problemId);
        setProblem(data);
        setCode(data.starterCode[language] || '');
        
        const noteData = await api.getNotes(problemId);
        setNote(noteData.note || '');

        setComments([
          { id: 1, author: 'algo_expert', text: 'This can be optimized to O(N) using a Hash Map. Check the first hint!', date: '2 days ago' },
          { id: 2, author: 'dev_newbie', text: 'Struggling with corner cases. What happens when there are negative values in the array?', date: '1 day ago' }
        ]);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load workspace files');
      } finally {
        setLoading(false);
      }
    };
    fetchProblemData();
  }, [problemId, toast]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
    }
  }, [language, problem]);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const leftPx = e.clientX - containerRef.current.getBoundingClientRect().left;
    const newWidthPercentage = (leftPx / containerWidth) * 100;
    
    if (newWidthPercentage >= 20 && newWidthPercentage <= 80) {
      setSplitWidth(newWidthPercentage);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleBookmarkToggle = async () => {
    try {
      const res = await api.toggleBookmark(problemId);
      setProblem(prev => ({ ...prev, bookmarked: res.bookmarked }));
      toast.success(res.bookmarked ? 'Added bookmark!' : 'Removed bookmark.');
    } catch (err) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleSaveNotes = async () => {
    setSavingNote(true);
    try {
      await api.saveNotes(problemId, note);
      toast.success('Notes saved successfully');
    } catch (err) {
      toast.error('Failed to save notes');
    } finally {
      setSavingNote(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newObj = {
      id: Date.now(),
      author: localStorage.getItem('geonixa_username') || 'guest',
      text: newComment,
      date: 'Just now'
    };
    setComments([newObj, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handleGenerateAiHint = () => {
    if (!problem) return;
    setGeneratingAiHint(true);
    setAiHint('');
    
    setTimeout(() => {
      const aiResponse = `### Geonixa AI Hint Engine\n\nFor **${problem.title}**, follow this algorithmic strategy:\n\n1. **Optimal Data Structure**: Use a Hash Map (Object) to track key values. This will allow you to look up elements in O(1) constant time.\n2. **Pass Mechanics**: As you traverse the items, check if 'target - current_value' is already indexed. If so, return index pair.\n3. **Time Complexity Goal**: Attempt to achieve a single-pass loop (O(N) running time). Avoid nested iteration which scales at O(N^2).`;
      setAiHint(aiResponse);
      setGeneratingAiHint(false);
      toast.info('AI code hint ready!');
    }, 1500);
  };

  const handleRunCode = async () => {
    if (compiling) return;
    setCompiling(true);
    setRightTab('console');
    setRunResult(null);

    const inputToUse = useCustomInput ? customInput : (problem.testCases?.[0]?.input || '');
    
    try {
      const res = await api.runCode(problemId, language, code, inputToUse);
      setRunResult(res);
      if (res.status === 'Accepted') {
        toast.success('Code compiled successfully');
      } else {
        toast.error(`Execution: ${res.status}`);
      }
    } catch (err) {
      setRunResult({
        status: 'Compilation Error',
        stderr: err.message || 'Internal sandbox execution crash'
      });
      toast.error('Code execution failed');
    } finally {
      setCompiling(false);
    }
  };

  const handleSubmitCode = async () => {
    if (compiling) return;
    setCompiling(true);
    setRightTab('console');
    setRunResult(null);

    try {
      const res = await api.submitCode(problemId, language, code);
      setRunResult(res);
      
      if (res.success) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        toast.success('Accepted! All test cases passed.');
        setProblem(prev => ({ ...prev, solved: true }));
      } else {
        toast.error(`Failed: ${res.status}. Passed ${res.passedCount}/${res.totalCount} cases.`);
      }
    } catch (err) {
      setRunResult({
        status: 'Runtime Error',
        stderr: err.message || 'Internal evaluation failure'
      });
      toast.error('Submission execution failed');
    } finally {
      setCompiling(false);
    }
  };

  if (loading) {
    return (
      <div className="workspace-container">
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Assembling Monaco compiler files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`workspace-container ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Workspace Header Toolbar */}
      <div className="workspace-header">
        <button onClick={() => setActivePage('problems')} className="back-btn">
          <ArrowLeft size={14} /> Back to Catalog
        </button>

        <div className="header-center">
          <span className="problem-title">
            {problem.id}. {problem.title}
          </span>
          <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          {problem.solved && (
            <span className="status-solved">
              <CheckCircle size={16} /> Solved
            </span>
          )}
        </div>

        <div className="header-right">
          <button
            onClick={handleBookmarkToggle}
            className={`icon-btn ${problem.bookmarked ? 'active' : ''}`}
            title="Bookmark problem"
          >
            <Bookmark size={16} fill={problem.bookmarked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="icon-btn"
            title="Fullscreen Workspace"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div ref={containerRef} className="workspace-body">
        {/* Left Side: Statement / Info Tabs */}
        <div className="panel-left" style={{ width: `${splitWidth}%` }}>
          <div className="tabs-header">
            <button
              onClick={() => setLeftTab('description')}
              className={`tab-btn ${leftTab === 'description' ? 'active' : ''}`}
            >
              Description
            </button>
            <button
              onClick={() => setLeftTab('hints')}
              className={`tab-btn ${leftTab === 'hints' ? 'active' : ''}`}
            >
              Hints
            </button>
            <button
              onClick={() => setLeftTab('notes')}
              className={`tab-btn ${leftTab === 'notes' ? 'active' : ''}`}
            >
              Notes
            </button>
            <button
              onClick={() => setLeftTab('discussion')}
              className={`tab-btn ${leftTab === 'discussion' ? 'active' : ''}`}
            >
              Discussion
            </button>
            <button
              onClick={() => setLeftTab('ai')}
              className={`tab-btn ${leftTab === 'ai' ? 'active' : ''}`}
            >
              <Sparkles size={14} /> AI Hints
            </button>
          </div>

          <div className="panel-content">
            {leftTab === 'description' && (
              <div className="problem-statement-container">
                <h3 className="problem-desc-title"># {problem.title}</h3>
                <div className="problem-desc-text" style={{ whiteSpace: 'pre-wrap' }}>{problem.description}</div>

                {problem.examples && problem.examples.length > 0 && (
                  <>
                    <div className="section-title">Examples</div>
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="example-box">
                        <div><strong>Example {i + 1}</strong></div>
                        <div><strong>Input:</strong> {ex.input}</div>
                        <div><strong>Output:</strong> {ex.output}</div>
                        {ex.explanation && <div><strong>Explanation:</strong> {ex.explanation}</div>}
                      </div>
                    ))}
                  </>
                )}

                {problem.constraints && problem.constraints.length > 0 && (
                  <>
                    <div className="section-title">Constraints</div>
                    <ul className="constraints-list">
                      {problem.constraints.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="section-title">Tags</div>
                <div className="category-tags" style={{ marginBottom: '16px' }}>
                  {problem.tags?.map(tag => (
                    <span key={tag} className="category-tag">{tag}</span>
                  ))}
                </div>

                <div className="section-title">Difficulty</div>
                <span className={`difficulty-badge ${problem.difficulty?.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
            )}

            {leftTab === 'hints' && (
              <div>
                <h3 className="problem-desc-title">Problem Hints</h3>
                {problem.hints?.length === 0 ? (
                  <p>No hints available for this problem.</p>
                ) : (
                  problem.hints?.map((hint, idx) => (
                    <details key={idx} className="hint-box">
                      <summary className="hint-summary">
                        <span>Hint {idx + 1}</span>
                        <ChevronDown size={16} />
                      </summary>
                      <p className="hint-content">{hint}</p>
                    </details>
                  ))
                )}
              </div>
            )}

            {leftTab === 'notes' && (
              <div className="notes-area">
                <div className="notes-header">
                  <h3 className="problem-desc-title">Saved Notes</h3>
                  <button onClick={handleSaveNotes} disabled={savingNote} className="btn-primary">
                    <Save size={14} /> {savingNote ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="notes-input"
                  placeholder="Draft your solution design, logic flows, or complexity analyses here..."
                />
              </div>
            )}

            {leftTab === 'discussion' && (
              <div>
                <h3 className="problem-desc-title">Community Discussions</h3>
                <form onSubmit={handleAddComment} className="discussion-form">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or share ideas..."
                    className="discussion-input"
                  />
                  <button type="submit" className="btn-primary">Post</button>
                </form>

                <div>
                  {comments.map((c) => (
                    <div key={c.id} className="comment-box">
                      <div className="comment-header">
                        <span className="comment-author">@{c.author}</span>
                        <span className="comment-date">{c.date}</span>
                      </div>
                      <p>{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {leftTab === 'ai' && (
              <div>
                <div className="notes-header">
                  <h3 className="problem-desc-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="var(--color-btn)" /> AI Assistant Hints
                  </h3>
                  <button onClick={handleGenerateAiHint} disabled={generatingAiHint} className="btn-primary">
                    {generatingAiHint ? 'Generating...' : 'Ask AI'}
                  </button>
                </div>
                
                {generatingAiHint ? (
                  <div style={{ padding: '40px', textAlign: 'center' }}>
                    <div className="spinner spinner-small" style={{ margin: '0 auto 12px' }} />
                    <span>Analyzing problem complexity constraints...</span>
                  </div>
                ) : aiHint ? (
                  <div className="ai-hint-box">{aiHint}</div>
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    <MessageSquare size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <p>Need structural guidance? Ask the AI engine for design blueprints.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseDown={handleMouseDown} className="resize-handle" />

        {/* Right Side: Monaco Editor + Output Console */}
        <div className="panel-right" style={{ width: `${100 - splitWidth}%` }}>
          <div className="editor-toolbar">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java (Simulation)</option>
              <option value="c">C (Simulation)</option>
              <option value="cpp">C++ (Simulation)</option>
            </select>
          </div>

          <div className="editor-container">
            <MonacoEditor
              height="100%"
              language={language === 'js' ? 'javascript' : (language === 'py' ? 'python' : language)}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: 'var(--font-code)',
                minimap: { enabled: false },
                automaticLayout: true,
                padding: { top: 12 },
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8
                }
              }}
              loading={
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="spinner spinner-small" />
                </div>
              }
            />
          </div>

          <div className="console-panel">
            <div className="console-toolbar">
              <div className="console-tabs">
                <button
                  onClick={() => setRightTab('testcases')}
                  className={`tab-btn ${rightTab === 'testcases' ? 'active' : ''}`}
                  style={{ padding: '8px 12px' }}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setRightTab('console')}
                  className={`tab-btn ${rightTab === 'console' ? 'active' : ''}`}
                  style={{ padding: '8px 12px' }}
                >
                  Console Output
                </button>
              </div>

              <div className="console-actions">
                <button onClick={handleRunCode} disabled={compiling} className="btn-secondary">
                  <Play size={12} fill="currentColor" /> Run
                </button>
                <button onClick={handleSubmitCode} disabled={compiling} className="btn-primary">
                  <Send size={12} /> Submit
                </button>
              </div>
            </div>

            <div className="console-content">
              {rightTab === 'testcases' && (
                <div>
                  <label className="custom-input-label">
                    <input
                      type="checkbox"
                      checked={useCustomInput}
                      onChange={(e) => setUseCustomInput(e.target.checked)}
                    />
                    Custom Execution Input
                  </label>
                  
                  {useCustomInput ? (
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Input variables (separated by newlines)"
                      className="custom-input-textarea"
                    />
                  ) : (
                    <div>
                      <div style={{ marginBottom: '8px' }}>Default Test Case Input:</div>
                      <div className="test-case-box">
                        {problem.testCases?.[0]?.input || 'No inputs available'}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {rightTab === 'console' && (
                <div style={{ height: '100%' }}>
                  {compiling ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px' }}>
                      <div className="spinner spinner-small" />
                      <span>Executing code blocks on compilers...</span>
                    </div>
                  ) : runResult ? (
                    <div>
                      <div className="run-result-header">
                        <span className={`result-status ${runResult.status === 'Accepted' || runResult.success ? 'accepted' : 'error'}`}>
                          {runResult.status === 'Accepted' || runResult.success ? (
                            <CheckCircle size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          {runResult.status || (runResult.success ? 'Accepted' : 'Wrong Answer')}
                        </span>
                        
                        {(runResult.time !== undefined || runResult.memory !== undefined) && (
                          <div className="result-stats">
                            {runResult.time !== undefined && <span>Runtime: <strong>{runResult.time} ms</strong></span>}
                            {runResult.memory !== undefined && <span>Memory: <strong>{runResult.memory} bytes</strong></span>}
                          </div>
                        )}
                      </div>

                      {runResult.stderr ? (
                        <div>
                          <div style={{ marginBottom: '8px', color: 'var(--color-hard)', fontWeight: 'bold' }}>Standard Error / Compile Output:</div>
                          <div className="stderr-box">{runResult.stderr}</div>
                        </div>
                      ) : (
                        <div>
                          {runResult.results ? (
                            <div>
                              <div style={{ marginBottom: '8px' }}>
                                Passed <strong>{runResult.passedCount}</strong> / <strong>{runResult.totalCount}</strong> Test Cases
                              </div>
                              <div>
                                {runResult.results.map((tc, idx) => (
                                  <div key={idx} className={`test-case-result ${tc.passed ? 'passed' : 'failed'}`}>
                                    <span>Case {idx + 1}: {tc.passed ? 'Passed' : 'Failed'} {tc.isHidden ? '(Hidden)' : ''}</span>
                                    {!tc.passed && !tc.isHidden && (
                                      <span>Expected: {tc.expected} | Got: {tc.stdout}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Your Output:</div>
                              <div className="stdout-box">{runResult.stdout || '(Empty)'}</div>
                              
                              {problem.testCases?.[0] && !useCustomInput && (
                                <div>
                                  <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Expected Output:</div>
                                  <div className="stdout-box" style={{ opacity: 0.8 }}>{problem.testCases[0].expected}</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
                      <span>Click Run to test code locally, or Submit to assert hidden cases.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
