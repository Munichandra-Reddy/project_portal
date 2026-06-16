import express from 'express';

const router = express.Router();

const MOCK_CONTESTS = {
  active: [
    {
      id: "active-1",
      title: "Geonixa Weekly Contest 42",
      startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // started 30m ago
      duration: "2 hours",
      participantsCount: 1420,
      questionsCount: 4,
      status: "Active"
    }
  ],
  upcoming: [
    {
      id: "upcoming-1",
      title: "Geonixa Biweekly Contest 12",
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // in 2 days
      duration: "1.5 hours",
      participantsCount: 845,
      questionsCount: 3,
      status: "Upcoming"
    },
    {
      id: "upcoming-2",
      title: "Algorithms Cup 2026",
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // in 5 days
      duration: "3 hours",
      participantsCount: 3290,
      questionsCount: 6,
      status: "Upcoming"
    }
  ],
  past: [
    {
      id: "past-1",
      title: "Weekly Code Sprint 41",
      startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration: "2 hours",
      participantsCount: 1890,
      questionsCount: 4,
      status: "Completed",
      winner: "algo_wizard"
    },
    {
      id: "past-2",
      title: "Beginner Dev Run 9",
      startTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      duration: "1.5 hours",
      participantsCount: 1120,
      questionsCount: 3,
      status: "Completed",
      winner: "codemonk_99"
    }
  ]
};

router.get('/', (req, res) => {
  res.json(MOCK_CONTESTS);
});

export default router;
