import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readJsonFile, getUserState } from './problems.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.query.userId || 'guest';
  const userState = getUserState(userId);

  const problemsPath = path.join(DATA_DIR, 'problems.json');
  const problems = readJsonFile(problemsPath, []);

  const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;
  const totalMedium = problems.filter(p => p.difficulty === 'Medium').length;
  const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

  const solvedEasy = problems.filter(p => p.difficulty === 'Easy' && userState.solvedProblems.includes(p.id)).length;
  const solvedMedium = problems.filter(p => p.difficulty === 'Medium' && userState.solvedProblems.includes(p.id)).length;
  const solvedHard = problems.filter(p => p.difficulty === 'Hard' && userState.solvedProblems.includes(p.id)).length;

  // Attempted problems: problems that have submissions but are not solved
  const submissions = userState.submissions || [];
  const attemptedIds = new Set(submissions.map(s => s.problemId));
  const solvedIds = new Set(userState.solvedProblems);
  const attemptedOnlyCount = Array.from(attemptedIds).filter(id => !solvedIds.has(id)).length;

  // Generate 7-day activity chart data
  const activityData = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Count submissions on this date
    const count = submissions.filter(s => s.timestamp.startsWith(dateStr)).length;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    activityData.push({ date: dateStr, name: dayName, submissions: count });
  }

  // Get recently viewed problem details
  const recentlyViewedIds = userState.recentlyViewed || [];
  const recentlyViewedProblems = recentlyViewedIds
    .map(id => problems.find(p => p.id === id))
    .filter(Boolean)
    .map(p => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      solved: userState.solvedProblems.includes(p.id)
    }));

  // Get bookmarked problem details
  const bookmarkedIds = userState.bookmarkedProblems || [];
  const bookmarkedProblems = bookmarkedIds
    .map(id => problems.find(p => p.id === id))
    .filter(Boolean)
    .map(p => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      solved: userState.solvedProblems.includes(p.id)
    }));

  res.json({
    streak: userState.streak || 0,
    solvedCount: userState.solvedProblems.length,
    attemptedCount: attemptedOnlyCount + userState.solvedProblems.length,
    totals: {
      all: problems.length,
      easy: totalEasy,
      medium: totalMedium,
      hard: totalHard
    },
    solved: {
      easy: solvedEasy,
      medium: solvedMedium,
      hard: solvedHard
    },
    activity: activityData,
    recentlyViewed: recentlyViewedProblems,
    bookmarked: bookmarkedProblems,
    projectProgress: 66 // static mock percentage for showcase project completion
  });
});

export default router;
