import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

async function importLeetCodeProblems() {
  console.log('Fetching problems from LeetCode...');
  try {
    const response = await fetch('https://leetcode.com/api/problems/all/');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    
    const problems = [];
    const seenIds = new Set();
    const seenTitles = new Set();

    console.log(`Received ${data.stat_status_pairs.length} total problems from LeetCode API.`);

    for (const pair of data.stat_status_pairs) {
      // Only public problems
      if (pair.paid_only) continue;

      const id = String(pair.stat.frontend_question_id);
      const title = pair.stat.question__title;
      
      // Global uniqueness constraints
      if (seenIds.has(id) || seenTitles.has(title)) {
        continue; // Skip duplicate
      }
      seenIds.add(id);
      seenTitles.add(title);

      const difficultyLevel = pair.difficulty.level;
      let difficulty = 'Easy';
      if (difficultyLevel === 2) difficulty = 'Medium';
      if (difficultyLevel === 3) difficulty = 'Hard';

      const totalAcs = pair.stat.total_acs;
      const totalSubmitted = pair.stat.total_submitted;
      const acceptanceRate = totalSubmitted > 0 ? (totalAcs / totalSubmitted * 100).toFixed(1) : '0.0';

      problems.push({
        id,
        title,
        titleSlug: pair.stat.question__title_slug,
        difficulty,
        acceptanceRate: parseFloat(acceptanceRate),
        // These fields will be populated on-demand by the API proxy
        description: null,
        constraints: null,
        tags: null,
        examples: null,
        testCases: null,
        starterCode: null,
        hints: null
      });
    }

    // Sort by Ascending ID by default to keep it orderly
    problems.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const problemsPath = path.join(DATA_DIR, 'problems.json');
    fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));

    console.log(`Successfully imported ${problems.length} unique public problems to problems.json.`);
    
  } catch (error) {
    console.error('Error importing LeetCode problems:', error);
  }
}

importLeetCodeProblems();
