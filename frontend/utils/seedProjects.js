import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const CATEGORIES = [
  'Web Development', 'Python Projects', 'Java Projects', 'MERN Stack',
  'Machine Learning', 'Data Science', 'Android Apps', 'AI Projects',
  'Cyber Security', 'Final Year Projects'
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const TECHNOLOGIES = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Django', 'Flask', 
  'Java', 'Spring Boot', 'MySQL', 'PostgreSQL', 'TensorFlow', 'PyTorch',
  'Flutter', 'Firebase', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Docker'
];

const PROJECT_TEMPLATES = [
  { title: 'Restaurant Management System', category: 'Web Development', tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'] },
  { title: 'Online Banking System', category: 'Java Projects', tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'] },
  { title: 'Hospital Management System', category: 'MERN Stack', tech: ['React', 'Node.js', 'Express', 'MongoDB'] },
  { title: 'Chat Application', category: 'Web Development', tech: ['React', 'Node.js', 'Socket.io', 'Express'] },
  { title: 'E-commerce Website', category: 'MERN Stack', tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'] },
  { title: 'Student Management System', category: 'Python Projects', tech: ['Python', 'Django', 'PostgreSQL'] },
  { title: 'AI Chatbot', category: 'AI Projects', tech: ['Python', 'TensorFlow', 'NLP', 'Flask'] },
  { title: 'Expense Tracker', category: 'Web Development', tech: ['React', 'Firebase', 'TailwindCSS'] },
  { title: 'Library Management System', category: 'Java Projects', tech: ['Java', 'Swing', 'MySQL'] },
  { title: 'Face Recognition System', category: 'Machine Learning', tech: ['Python', 'OpenCV', 'PyTorch'] },
  { title: 'Portfolio Website', category: 'Web Development', tech: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Online Exam System', category: 'Final Year Projects', tech: ['PHP', 'MySQL', 'Bootstrap'] },
];

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateProject(index) {
  const template = index < PROJECT_TEMPLATES.length 
    ? PROJECT_TEMPLATES[index] 
    : {
        title: `Dynamic Project Blueprint ${index + 1}`,
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
        tech: getRandomItems(TECHNOLOGIES, Math.floor(Math.random() * 4) + 3)
      };

  const id = (index + 1).toString();
  const slug = template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return {
    id,
    title: template.title,
    slug,
    thumbnail: `https://picsum.photos/seed/${slug}/600/400`,
    banner: `https://picsum.photos/seed/${slug}-banner/1200/400`,
    category: template.category,
    difficulty: DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)],
    duration: `${Math.floor(Math.random() * 8) + 1} Weeks`,
    technologyStack: template.tech, // to maintain compatibility with existing
    technologiesUsed: template.tech,
    shortDescription: `A comprehensive ${template.category} project showcasing ${template.tech.join(', ')}.`,
    overview: `This ${template.title} is designed to solve real-world problems efficiently. It leverages modern technologies and best practices to deliver a robust solution.`,
    completeDescription: `Dive deep into the architecture of the ${template.title}. This project provides a fully functional, production-ready implementation of a ${template.category} application. It incorporates advanced design patterns, secure data handling, and a highly responsive user interface. Whether you are using this as a final year project or a portfolio piece, it serves as an excellent foundation for learning and further customization.`,
    objectives: [
      'Implement a scalable and secure backend architecture.',
      'Develop a responsive, user-friendly frontend interface.',
      'Demonstrate practical application of CRUD operations.',
      'Ensure code maintainability through clean architecture principles.'
    ],
    features: [
      'User Authentication and Authorization (JWT / OAuth)',
      'Real-time data processing and updates',
      'Interactive Dashboard with analytics',
      'Responsive design compatible with mobile devices',
      'Secure API endpoints with rate limiting'
    ],
    modules: [
      'Authentication Module',
      'Dashboard & Analytics Module',
      'Data Management Module',
      'Reporting & Export Module',
      'Settings & Configuration Module'
    ],
    installationSteps: [
      '# Clone the repository\ngit clone https://github.com/geonixa/' + slug + '.git',
      '# Navigate into the directory\ncd ' + slug,
      '# Install dependencies\nnpm install',
      '# Configure environment variables\ncp .env.example .env',
      '# Start the development server\nnpm run dev'
    ],
    screenshots: [
      `https://picsum.photos/seed/${slug}-1/800/600`,
      `https://picsum.photos/seed/${slug}-2/800/600`,
      `https://picsum.photos/seed/${slug}-3/800/600`,
      `https://picsum.photos/seed/${slug}-4/800/600`
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    sourceCodeUrl: `https://github.com/geonixa/${slug}`,
    githubUrl: `https://github.com/geonixa/${slug}`,
    downloadUrl: `https://geonixa.com/downloads/${slug}.zip`,
    reportUrl: `https://geonixa.com/reports/${slug}.pdf`,
    repoInfo: {
      stars: Math.floor(Math.random() * 500) + 10,
      forks: Math.floor(Math.random() * 200) + 5,
      lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    }
  };
}

const generateAllProjects = () => {
  const projects = [];
  for (let i = 0; i < 50; i++) {
    projects.push(generateProject(i));
  }
  return projects;
};

const run = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const projectsPath = path.join(DATA_DIR, 'projects.json');
  const projects = generateAllProjects();

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
  console.log(`✅ Successfully generated 50 projects into ${projectsPath}`);
};

run();
