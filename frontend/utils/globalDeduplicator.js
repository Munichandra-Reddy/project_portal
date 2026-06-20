import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

function hashString(str) {
  if (!str) return null;
  return crypto.createHash('md5').update(str).digest('hex');
}

export function runGlobalDeduplication() {
  console.log('Running Global Problem Deduplication...');
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  
  if (!fs.existsSync(problemsPath)) {
    console.log('problems.json not found, skipping deduplication.');
    return;
  }
  
  const content = fs.readFileSync(problemsPath, 'utf-8');
  let problems = [];
  try {
    problems = JSON.parse(content);
  } catch (err) {
    console.error('Error parsing problems.json:', err);
    return;
  }

  const uniqueProblems = [];
  const seenIds = new Set();
  const seenTitles = new Set();
  const seenDescriptionHashes = new Set();

  let duplicatesRemoved = 0;

  for (const p of problems) {
    // 1. Check ID
    if (seenIds.has(p.id)) {
      duplicatesRemoved++;
      continue;
    }

    // 2. Check Title
    if (seenTitles.has(p.title)) {
      duplicatesRemoved++;
      continue;
    }

    // 3. Check Description Hash
    if (p.description) {
      const descHash = hashString(p.description);
      if (seenDescriptionHashes.has(descHash)) {
        duplicatesRemoved++;
        continue;
      }
      seenDescriptionHashes.add(descHash);
    }

    // No duplicates found for this problem
    seenIds.add(p.id);
    seenTitles.add(p.title);
    
    uniqueProblems.push(p);
  }

  if (duplicatesRemoved > 0) {
    console.log(`Global Deduplicator removed ${duplicatesRemoved} duplicate problems.`);
    fs.writeFileSync(problemsPath, JSON.stringify(uniqueProblems, null, 2));
  } else {
    console.log('No duplicates found. Database is clean.');
  }
}
