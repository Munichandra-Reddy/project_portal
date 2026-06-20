import express from 'express';
import { getUserState } from './problems.js';

const router = express.Router();

const MOCK_LEADERBOARD = [
  { rank: 1, username: "algo_wizard", solved: 95, points: 2850, streak: 42 },
  { rank: 2, username: "codemonk_99", solved: 88, points: 2540, streak: 18 },
  { rank: 3, username: "binary_boss", solved: 76, points: 2120, streak: 25 },
  { rank: 4, username: "dev_dynamo", solved: 62, points: 1720, streak: 8 },
  { rank: 5, username: "syntax_error_fixed", solved: 55, points: 1480, streak: 12 },
  { rank: 6, username: "lucid_coder", solved: 48, points: 1250, streak: 0 },
  { rank: 7, username: "byte_bender", solved: 40, points: 980, streak: 4 }
];

router.get('/', (req, res) => {
  const userId = req.query.userId || 'guest';
  const userState = getUserState(userId);
  const userSolvedCount = userState.solvedProblems?.length || 0;
  const userStreak = userState.streak || 0;
  
  // Calculate points: 30pts per solved problem + 10pts per streak day
  const userPoints = (userSolvedCount * 30) + (userStreak * 10);

  // Combine user details with the mock ranks
  const currentUserRecord = {
    rank: 0, // will compute below
    username: userId === 'guest' ? 'Guest Explorer' : userId,
    solved: userSolvedCount,
    points: userPoints,
    streak: userStreak,
    isCurrentUser: true
  };

  const combinedList = [...MOCK_LEADERBOARD, currentUserRecord];
  
  // Sort by points descending
  combinedList.sort((a, b) => b.points - a.points);

  // Assign fresh ranks based on sorting position
  const rankedList = combinedList.map((user, index) => ({
    ...user,
    rank: index + 1
  }));

  res.json({
    leaderboard: rankedList,
    currentUser: rankedList.find(u => u.isCurrentUser)
  });
});

export default router;
