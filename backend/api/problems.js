import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const router = express.Router();

// Helper to read JSON safely
const readJsonFile = (filePath, defaultVal = []) => {
  try {
    if (!fs.existsSync(filePath)) return defaultVal;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
};

// Helper to write JSON safely
const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Helper to get or create user profile state
const getUserState = (userId) => {
  const userStatePath = path.join(DATA_DIR, 'user_states.json');
  const allStates = readJsonFile(userStatePath, {});
  
  if (!allStates[userId]) {
    allStates[userId] = {
      solvedProblems: [],
      bookmarkedProblems: [],
      notes: {},
      streak: 0,
      lastActiveDate: ''
    };
    writeJsonFile(userStatePath, allStates);
  }
  return allStates[userId];
};

const saveUserState = (userId, state) => {
  const userStatePath = path.join(DATA_DIR, 'user_states.json');
  const allStates = readJsonFile(userStatePath, {});
  allStates[userId] = state;
  writeJsonFile(userStatePath, allStates);
};

/**
 * GET /api/problems
 * Query Params: page, limit, search, difficulty, tag, solvedStatus, userId
 */
router.get('/', (req, res) => {
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  let problems = readJsonFile(problemsPath, []);
  
  const userId = req.query.userId || 'guest';
  const userState = getUserState(userId);
  const solvedSet = new Set(userState.solvedProblems || []);
  const bookmarkedSet = new Set(userState.bookmarkedProblems || []);

  // Enrich problem items with solved and bookmarked statuses for the user
  problems = problems.map(p => ({
    ...p,
    solved: solvedSet.has(p.id),
    bookmarked: bookmarkedSet.has(p.id)
  }));

  // Filtering
  const { search, difficulty, tag, solvedStatus, page = 1, limit = 20 } = req.query;
  
  if (search) {
    const q = search.toLowerCase();
    problems = problems.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.id.includes(q)
    );
  }
  
  if (difficulty) {
    problems = problems.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  
  if (tag) {
    problems = problems.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }
  
  if (solvedStatus) {
    if (solvedStatus === 'solved') {
      problems = problems.filter(p => p.solved);
    } else if (solvedStatus === 'unsolved') {
      problems = problems.filter(p => !p.solved);
    }
  }

  // Pagination
  const total = problems.length;
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const paginatedProblems = problems.slice(startIndex, startIndex + parseInt(limit));

  // Gather all unique tags for filter autocomplete
  const allTagsSet = new Set();
  problems.forEach(p => p.tags.forEach(t => allTagsSet.add(t)));

  res.json({
    problems: paginatedProblems,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    },
    solvedCount: solvedSet.size,
    totalCount: total
  });
});

/**
 * GET /api/problems/:id
 */
router.get('/:id', (req, res) => {
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  const problems = readJsonFile(problemsPath, []);
  
  const problem = problems.find(p => p.id === req.params.id);
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  
  const userId = req.query.userId || 'guest';
  const userState = getUserState(userId);
  
  // Track recently viewed
  if (!userState.recentlyViewed) userState.recentlyViewed = [];
  const idx = userState.recentlyViewed.indexOf(problem.id);
  if (idx > -1) {
    userState.recentlyViewed.splice(idx, 1);
  }
  userState.recentlyViewed.unshift(problem.id);
  if (userState.recentlyViewed.length > 8) {
    userState.recentlyViewed.pop();
  }
  saveUserState(userId, userState);
  
  res.json({
    ...problem,
    solved: userState.solvedProblems.includes(problem.id),
    bookmarked: userState.bookmarkedProblems.includes(problem.id)
  });
});

/**
 * POST /api/problems/:id/bookmark
 */
router.post('/:id/bookmark', (req, res) => {
  const { userId = 'guest' } = req.body;
  const problemId = req.params.id;
  
  const userState = getUserState(userId);
  const bookmarkIndex = userState.bookmarkedProblems.indexOf(problemId);
  
  let bookmarked = false;
  if (bookmarkIndex > -1) {
    userState.bookmarkedProblems.splice(bookmarkIndex, 1);
  } else {
    userState.bookmarkedProblems.push(problemId);
    bookmarked = true;
  }
  
  saveUserState(userId, userState);
  res.json({ success: true, bookmarked });
});

/**
 * POST /api/problems/:id/notes
 */
router.post('/:id/notes', (req, res) => {
  const { userId = 'guest', note } = req.body;
  const problemId = req.params.id;
  
  const userState = getUserState(userId);
  userState.notes[problemId] = note;
  
  saveUserState(userId, userState);
  res.json({ success: true, note });
});

/**
 * GET /api/problems/:id/notes
 */
router.get('/:id/notes', (req, res) => {
  const userId = req.query.userId || 'guest';
  const problemId = req.params.id;
  
  const userState = getUserState(userId);
  const note = userState.notes[problemId] || '';
  res.json({ note });
});

export default router;
export { getUserState, saveUserState, readJsonFile, writeJsonFile };
