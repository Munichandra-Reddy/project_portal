import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { readJsonFile, getUserState, saveUserState } from './problems.js';
import { runLocalCode } from '../compiler/localRunner.js';
import { runJudge0 } from '../compiler/judge0Service.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const router = express.Router();
const USE_LOCAL_COMPILER = process.env.USE_LOCAL_COMPILER === 'true';

// Helper to format date as YYYY-MM-DD
const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

// Check if output matches expected value (ignoring trailing spaces, newlines, or outer brackets if array formats slightly differ)
const compareOutputs = (actual, expected) => {
  if (!actual || !expected) return false;
  
  const cleanAct = actual.trim().replace(/\r/g, '').toLowerCase();
  const cleanExp = expected.trim().replace(/\r/g, '').toLowerCase();

  // Exact comparison
  if (cleanAct === cleanExp) return true;

  // Space-agnostic comparison for arrays / objects, e.g. [1, 2] vs [1,2]
  const compress = (str) => str.replace(/\s+/g, '');
  if (compress(cleanAct) === compress(cleanExp)) return true;

  // Handle boolean variations: "true" vs true or "1" vs "true"
  if ((cleanAct === 'true' && cleanExp === '1') || (cleanAct === '1' && cleanExp === 'true')) return true;
  if ((cleanAct === 'false' && cleanExp === '0') || (cleanAct === '0' && cleanExp === 'false')) return true;

  return false;
};

/**
 * POST /api/submissions/run
 * Compile and run code on user's custom input
 */
router.post('/run', async (req, res) => {
  const { userId = 'guest', problemId, language, code, customInput = '' } = req.body;

  if (!problemId || !language || !code) {
    return res.status(400).json({ error: 'Missing required parameters: problemId, language, code' });
  }

  // Load problem context
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  const problems = readJsonFile(problemsPath, []);
  const problem = problems.find(p => p.id === problemId);

  if (!problem) {
    return res.status(404).json({ error: 'Problem definition not found' });
  }

  const fnName = problem.fn || 'solution';
  const argsCount = problem.starterCode[language]?.split('(')[1]?.split(')')[0]?.split(',').length || 1;
  const firstTestCaseExpected = problem.testCases?.[0]?.expected || '';

  try {
    let result;
    if (USE_LOCAL_COMPILER) {
      result = await runLocalCode(language, code, fnName, argsCount, customInput, firstTestCaseExpected);
    } else {
      result = await runJudge0(language, code, customInput, firstTestCaseExpected);
    }

    res.json({
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      time: result.time, // in ms
      memory: result.memory || 0
    });
  } catch (error) {
    console.error("Compilation endpoint error:", error);
    res.status(500).json({
      status: 'Compilation Error',
      stdout: '',
      stderr: error.message || 'Internal execution server error'
    });
  }
});

/**
 * POST /api/submissions/submit
 * Evaluate code against all hidden & visible test cases
 */
router.post('/submit', async (req, res) => {
  const { userId = 'guest', problemId, language, code } = req.body;

  if (!problemId || !language || !code) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Load problem context
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  const problems = readJsonFile(problemsPath, []);
  const problem = problems.find(p => p.id === problemId);

  if (!problem) {
    return res.status(404).json({ error: 'Problem definition not found' });
  }

  const testCases = problem.testCases || [];
  if (testCases.length === 0) {
    return res.status(400).json({ error: 'Problem has no test cases configured' });
  }

  const fnName = problem.fn || 'solution';
  const argsCount = problem.starterCode[language]?.split('(')[1]?.split(')')[0]?.split(',').length || 1;

  try {
    const results = [];
    let passedCount = 0;
    let finalStatus = 'Accepted';
    let maxTime = 0;
    let maxMemory = 0;
    let failingTestCase = null;

    // Run test cases sequentially
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      let resRun;
      
      if (USE_LOCAL_COMPILER) {
        resRun = await runLocalCode(language, code, fnName, argsCount, tc.input, tc.expected);
      } else {
        resRun = await runJudge0(language, code, tc.input, tc.expected);
      }

      maxTime = Math.max(maxTime, resRun.time || 0);
      maxMemory = Math.max(maxMemory, resRun.memory || 0);

      const passed = resRun.status === 'Accepted' && compareOutputs(resRun.stdout, tc.expected);
      
      const tcResult = {
        testCaseIndex: i,
        passed,
        status: passed ? 'Accepted' : (resRun.status === 'Accepted' ? 'Wrong Answer' : resRun.status),
        stdout: tc.isHidden ? 'Hidden' : resRun.stdout,
        stderr: tc.isHidden ? 'Hidden' : resRun.stderr,
        expected: tc.isHidden ? 'Hidden' : tc.expected,
        input: tc.isHidden ? 'Hidden' : tc.input,
        isHidden: tc.isHidden
      };

      results.push(tcResult);

      if (passed) {
        passedCount++;
      } else if (!failingTestCase) {
        // Record details of the first failing case to return as error
        failingTestCase = tcResult;
        finalStatus = tcResult.status;
      }
    }

    const allPassed = passedCount === testCases.length;

    // Retrieve and update user profile state
    const userState = getUserState(userId);
    
    // Manage streak updates
    const today = getTodayString();
    const yesterday = getYesterdayString();
    if (allPassed) {
      if (!userState.solvedProblems.includes(problemId)) {
        userState.solvedProblems.push(problemId);
      }

      if (userState.lastActiveDate === '') {
        userState.streak = 1;
      } else if (userState.lastActiveDate === yesterday) {
        userState.streak += 1;
      } else if (userState.lastActiveDate !== today) {
        // Solved it after a gap of 2 or more days, restart streak
        userState.streak = 1;
      }
      userState.lastActiveDate = today;
    } else {
      // Still active today (attempt made), update last active date but don't increment streak
      if (userState.lastActiveDate === '') {
        userState.lastActiveDate = today;
        userState.streak = 1;
      } else if (userState.lastActiveDate !== today && userState.lastActiveDate !== yesterday) {
        // Gap in streak, reset to 0
        userState.streak = 0;
      }
    }

    // Save submission records
    const submissionRecord = {
      id: uuidv4(),
      problemId,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
      language,
      status: finalStatus,
      code,
      timestamp: new Date().toISOString(),
      time: maxTime,
      memory: maxMemory,
      passedCount,
      totalCount: testCases.length
    };

    if (!userState.submissions) userState.submissions = [];
    userState.submissions.unshift(submissionRecord); // newest first

    saveUserState(userId, userState);

    res.json({
      success: allPassed,
      status: finalStatus,
      passedCount,
      totalCount: testCases.length,
      results,
      submission: submissionRecord
    });

  } catch (error) {
    console.error("Submission processing error:", error);
    res.status(500).json({
      status: 'Runtime Error',
      stdout: '',
      stderr: error.message || 'Compiler process failed during assertions evaluation'
    });
  }
});

/**
 * GET /api/submissions/history
 * Fetch user's submission history
 */
router.get('/history', (req, res) => {
  const userId = req.query.userId || 'guest';
  const userState = getUserState(userId);
  const submissions = userState.submissions || [];
  
  const problemId = req.query.problemId;
  if (problemId) {
    const filtered = submissions.filter(s => s.problemId === problemId);
    return res.json(filtered);
  }
  
  res.json(submissions);
});

export default router;
export { compareOutputs };
