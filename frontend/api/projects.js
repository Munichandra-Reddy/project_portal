import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readJsonFile } from './problems.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const router = express.Router();

const getProjectsData = () => {
  const projectsPath = path.join(DATA_DIR, 'projects.json');
  return readJsonFile(projectsPath, []);
};

/**
 * GET /api/projects
 * Supports query params: q (search), category, difficulty, technology, sort
 */
router.get('/', (req, res) => {
  let projects = getProjectsData();
  const { q, category, difficulty, technology, sort } = req.query;

  if (q) {
    const search = q.toLowerCase();
    projects = projects.filter(p => 
      p.title.toLowerCase().includes(search) || 
      p.shortDescription.toLowerCase().includes(search) ||
      (p.technologiesUsed && p.technologiesUsed.some(t => t.toLowerCase().includes(search)))
    );
  }

  if (category && category !== 'All') {
    projects = projects.filter(p => p.category === category);
  }

  if (difficulty && difficulty !== 'All') {
    projects = projects.filter(p => p.difficulty === difficulty);
  }

  if (technology && technology !== 'All') {
    projects = projects.filter(p => p.technologyStack && p.technologyStack.includes(technology));
  }

  // Sorting
  if (sort === 'newest') {
    // Assuming newer projects have higher IDs or mock a date. For now, reverse order.
    projects = projects.reverse();
  } else if (sort === 'popular') {
    // Mock sort by stars
    projects.sort((a, b) => (b.repoInfo?.stars || 0) - (a.repoInfo?.stars || 0));
  }

  // Return summarized representations
  const projectSummaries = projects.map(p => ({
    id: p.id,
    thumbnail: p.thumbnail,
    title: p.title,
    technologyStack: p.technologyStack || p.technologiesUsed,
    shortDescription: p.shortDescription,
    difficulty: p.difficulty,
    category: p.category,
    duration: p.duration
  }));

  res.json(projectSummaries);
});

/**
 * GET /api/projects/search
 */
router.get('/search', (req, res) => {
  const projects = getProjectsData();
  const { q } = req.query;
  if (!q) return res.json([]);
  
  const search = q.toLowerCase();
  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search) || 
    p.shortDescription.toLowerCase().includes(search)
  ).map(p => ({
    id: p.id,
    thumbnail: p.thumbnail,
    title: p.title,
    technologyStack: p.technologyStack || p.technologiesUsed,
    shortDescription: p.shortDescription,
    difficulty: p.difficulty,
    category: p.category,
    duration: p.duration
  }));
  
  res.json(filtered);
});

/**
 * GET /api/projects/category/:category
 */
router.get('/category/:category', (req, res) => {
  const projects = getProjectsData();
  const cat = req.params.category;
  
  const filtered = projects.filter(p => p.category === cat).map(p => ({
    id: p.id,
    thumbnail: p.thumbnail,
    title: p.title,
    technologyStack: p.technologyStack || p.technologiesUsed,
    shortDescription: p.shortDescription,
    difficulty: p.difficulty,
    category: p.category,
    duration: p.duration
  }));
  
  res.json(filtered);
});

/**
 * GET /api/projects/:id
 */
router.get('/:id', (req, res) => {
  const projects = getProjectsData();
  const project = projects.find(p => p.id === req.params.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  // Find related projects
  const related = projects
    .filter(p => p.id !== project.id && (p.category === project.category || p.difficulty === project.difficulty))
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      thumbnail: p.thumbnail,
      title: p.title,
      technologyStack: p.technologyStack || p.technologiesUsed,
      difficulty: p.difficulty,
      shortDescription: p.shortDescription
    }));

  res.json({
    ...project,
    relatedProjects: related
  });
});

export default router;
