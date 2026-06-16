import React, { useEffect, useState, useMemo } from 'react';
import './Projects.css';

const CATEGORIES = [
  'All',
  'Final Year Projects',
  'Embedded Systems Projects',
  'VLSI Projects',
  'IoT Projects',
  'Machine Learning Projects',
  'Artificial Intelligence Projects',
  'Python Projects',
  'Java Projects',
  'Web Development Projects',
  'Mobile App Projects',
  'Cyber Security Projects',
  'Cloud Computing Projects',
  'Data Science Projects'
];

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const ITEMS_PER_PAGE = 12;

const PYTHON_TOPICS = [
  "Introduction to Python", "Variables", "Data Types", "Operators", "Input & Output",
  "Conditional Statements", "Loops", "Functions", "Lists", "Tuples", "Sets",
  "Dictionaries", "Strings", "File Handling", "Exception Handling", "Modules & Packages",
  "OOPs Concepts", "Decorators", "Generators", "Iterators", "Multithreading",
  "Database Connectivity", "NumPy", "Pandas", "Matplotlib", "Flask", "Django",
  "REST APIs", "Testing", "Python Interview Questions"
];

const JAVA_TOPICS = [
  "Introduction to Java",
  "Java Program Structure",
  "Variables",
  "Data Types",
  "Operators",
  "Type Casting",
  "Conditional Statements",
  "Loops",
  "Arrays",
  "Strings",
  "Methods",
  "Constructors",
  "OOP Concepts",
  "Packages",
  "Exception Handling",
  "Collections Framework",
  "ArrayList",
  "LinkedList",
  "HashSet",
  "HashMap",
  "Generics",
  "File Handling",
  "Multithreading",
  "JDBC",
  "Java Streams API",
  "Lambda Expressions",
  "Spring Framework",
  "Spring Boot",
  "REST APIs",
  "Maven",
  "Unit Testing",
  "Java Interview Questions"
];

const VLSI_TOPICS = [
  "VLSI Design - Home",
  "VLSI Design - Digital System",
  "VLSI Design - FPGA Technology",
  "VLSI Design - MOS Transistor",
  "VLSI Design - MOS Inverter",
  "Combinational MOS Logic Circuits",
  "Sequential MOS Logic Circuits",
  "VHDL - Introduction",
  "VHDL - Combinational Circuits",
  "VHDL - Sequential Circuits",
  "Verilog HDL - Introduction",
  "Verilog HDL - Combinational Logic",
  "Verilog HDL - Sequential Logic",
  "CMOS Technology",
  "ASIC Design Flow",
  "FPGA Design Flow",
  "Logic Gates",
  "Flip-Flops",
  "Counters",
  "Shift Registers",
  "Memory Design",
  "SRAM",
  "DRAM",
  "FinFET Technology",
  "Low Power VLSI Design",
  "Physical Design",
  "Static Timing Analysis (STA)",
  "DFT (Design for Testability)",
  "RTL Design",
  "Synthesis",
  "Floor Planning",
  "Placement & Routing",
  "Clock Tree Synthesis",
  "Sign-Off Verification",
  "VLSI Interview Questions"
];

const EMBEDDED_TOPICS = [
  "Introduction to Embedded Systems",
  "Embedded System Architecture",
  "Microcontrollers vs Microprocessors",
  "Embedded C Programming",
  "GPIO Programming",
  "Timers and Counters",
  "Interrupts",
  "UART Communication",
  "SPI Communication",
  "I2C Communication",
  "ADC and DAC",
  "Sensors and Actuators",
  "PWM Techniques",
  "RTOS Fundamentals",
  "Device Drivers",
  "ARM Cortex-M Architecture",
  "Embedded Linux Basics",
  "IoT with Embedded Systems",
  "Power Management in Embedded Systems",
  "Embedded Project Development Lifecycle"
];

const AI_TOPICS = [
  "Introduction to Artificial Intelligence",
  "History and Evolution of AI",
  "AI vs Machine Learning vs Deep Learning",
  "Python for Artificial Intelligence",
  "Data Preprocessing and Feature Engineering",
  "Supervised Learning",
  "Unsupervised Learning",
  "Reinforcement Learning",
  "Neural Networks Fundamentals",
  "Deep Learning",
  "Convolutional Neural Networks (CNN)",
  "Recurrent Neural Networks (RNN)",
  "Transformers and Attention Mechanisms",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "Generative AI",
  "Large Language Models (LLMs)",
  "AI Agents and Autonomous Systems",
  "Model Training and Evaluation",
  "AI Ethics and Responsible AI",
  "Explainable AI (XAI)",
  "AI Deployment and MLOps",
  "AI in Healthcare",
  "AI in Finance",
  "AI Project Development Lifecycle"
];

const ML_TOPICS = [
  "Introduction to Machine Learning",
  "Types of Machine Learning",
  "Data Collection and Data Preparation",
  "Data Cleaning and Preprocessing",
  "Exploratory Data Analysis (EDA)",
  "Feature Engineering",
  "Feature Selection Techniques",
  "Train-Test Split and Cross Validation",
  "Supervised Learning",
  "Linear Regression",
  "Logistic Regression",
  "Decision Trees",
  "Random Forest",
  "Support Vector Machines (SVM)",
  "K-Nearest Neighbors (KNN)",
  "Naive Bayes Algorithm",
  "Unsupervised Learning",
  "K-Means Clustering",
  "Hierarchical Clustering",
  "Principal Component Analysis (PCA)",
  "Association Rule Mining",
  "Reinforcement Learning Basics",
  "Model Evaluation Metrics",
  "Hyperparameter Tuning",
  "Ensemble Learning",
  "Model Deployment",
  "MLOps Fundamentals",
  "Machine Learning Project Lifecycle"
];

const CLOUD_TOPICS = [
  "Introduction to Cloud Computing",
  "Evolution of Cloud Computing",
  "Cloud Computing Fundamentals",
  "Cloud Service Models (IaaS, PaaS, SaaS)",
  "Cloud Deployment Models",
  "Public Cloud",
  "Private Cloud",
  "Hybrid Cloud",
  "Multi-Cloud Architecture",
  "Virtualization Fundamentals",
  "Hypervisors and Virtual Machines",
  "Containerization",
  "Docker Fundamentals",
  "Kubernetes Fundamentals",
  "Cloud Networking",
  "Virtual Private Cloud (VPC)",
  "Cloud Storage Services",
  "Object Storage",
  "Block Storage",
  "File Storage",
  "Cloud Databases",
  "Database as a Service (DBaaS)",
  "Load Balancing",
  "Auto Scaling",
  "High Availability and Fault Tolerance",
  "Disaster Recovery",
  "Cloud Security Fundamentals",
  "Identity and Access Management (IAM)",
  "Cloud Monitoring and Logging",
  "DevOps in Cloud Computing",
  "Infrastructure as Code (IaC)",
  "Serverless Computing",
  "Function as a Service (FaaS)",
  "Edge Computing",
  "AWS Fundamentals",
  "Microsoft Azure Fundamentals",
  "Google Cloud Platform Fundamentals",
  "Cloud Cost Optimization",
  "Cloud Migration Strategies",
  "Cloud Compliance and Governance",
  "Cloud Architecture Design Patterns",
  "Microservices Architecture",
  "Cloud-Native Applications",
  "Cloud Computing Project Lifecycle"
];


export const Projects = ({ setActivePage, setSelectedProjectId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTopic, setActiveTopic] = useState(null);
  const [topicSearchQuery, setTopicSearchQuery] = useState('');
  const [topicProgress, setTopicProgress] = useState({
    "Introduction to Python": "Completed",
    "Variables": "In Progress"
  });
  
  const [topicData, setTopicData] = useState(null);
  const [topicLoading, setTopicLoading] = useState(false);

  // Java Learning Path state
  const [activeJavaTopic, setActiveJavaTopic] = useState(null);
  const [javaTopicSearchQuery, setJavaTopicSearchQuery] = useState('');
  const [javaTopicProgress, setJavaTopicProgress] = useState({
    "Introduction to Java": "Completed",
    "Java Program Structure": "In Progress"
  });
  const [javaTopicData, setJavaTopicData] = useState(null);
  const [javaTopicLoading, setJavaTopicLoading] = useState(false);

  // VLSI Learning Path state
  const [activeVlsiTopic, setActiveVlsiTopic] = useState(null);
  const [vlsiTopicSearchQuery, setVlsiTopicSearchQuery] = useState('');
  const [vlsiTopicProgress, setVlsiTopicProgress] = useState({
    "VLSI Design - Home": "Completed",
    "VLSI Design - Digital System": "In Progress"
  });
  const [vlsiTopicData, setVlsiTopicData] = useState(null);
  const [vlsiTopicLoading, setVlsiTopicLoading] = useState(false);

  // Embedded Learning Path state
  const [activeEmbeddedTopic, setActiveEmbeddedTopic] = useState(null);
  const [embeddedTopicSearchQuery, setEmbeddedTopicSearchQuery] = useState('');
  const [embeddedTopicProgress, setEmbeddedTopicProgress] = useState({
    "Introduction to Embedded Systems": "Completed",
    "Embedded System Architecture": "In Progress"
  });
  const [embeddedTopicData, setEmbeddedTopicData] = useState(null);
  const [embeddedTopicLoading, setEmbeddedTopicLoading] = useState(false);

  // AI Learning Path state
  const [activeAITopic, setActiveAITopic] = useState(null);
  const [aiTopicSearchQuery, setAiTopicSearchQuery] = useState('');
  const [aiTopicProgress, setAiTopicProgress] = useState({
    "Introduction to Artificial Intelligence": "Completed",
    "History and Evolution of AI": "In Progress"
  });
  const [aiTopicData, setAiTopicData] = useState(null);
  const [aiTopicLoading, setAiTopicLoading] = useState(false);

  // ML Learning Path state
  const [activeMLTopic, setActiveMLTopic] = useState(null);
  const [mlTopicSearchQuery, setMlTopicSearchQuery] = useState('');
  const [mlTopicProgress, setMlTopicProgress] = useState({
    "Introduction to Machine Learning": "Completed",
    "Types of Machine Learning": "In Progress"
  });
  const [mlTopicData, setMlTopicData] = useState(null);
  const [mlTopicLoading, setMlTopicLoading] = useState(false);

  // Cloud Learning Path state
  const [activeCloudTopic, setActiveCloudTopic] = useState(null);
  const [cloudTopicSearchQuery, setCloudTopicSearchQuery] = useState('');
  const [cloudTopicProgress, setCloudTopicProgress] = useState({
    "Introduction to Cloud Computing": "Completed",
    "Evolution of Cloud Computing": "In Progress"
  });
  const [cloudTopicData, setCloudTopicData] = useState(null);
  const [cloudTopicLoading, setCloudTopicLoading] = useState(false);

  useEffect(() => {
    if (!activeTopic) return;
    const fetchTopicData = async () => {
      setTopicLoading(true);
      try {
        const res = await fetch(`/data/python-topics/${activeTopic}.json`);
        if (!res.ok) throw new Error('Topic not found');
        const data = await res.json();
        setTopicData(data);
      } catch (err) {
        console.error(err);
        setTopicData(null);
      } finally {
        setTopicLoading(false);
      }
    };
    fetchTopicData();
  }, [activeTopic]);

  // Fetch Java topic data
  useEffect(() => {
    if (!activeJavaTopic) return;
    const fetchJavaTopicData = async () => {
      setJavaTopicLoading(true);
      try {
        const res = await fetch(`/data/java-topics/${encodeURIComponent(activeJavaTopic)}.json`);
        if (!res.ok) {
          const fallbackRes = await fetch(`/data/java-topics/Fallback.json`);
          if (!fallbackRes.ok) throw new Error('Topic and fallback not found');
          const fallbackData = await fallbackRes.json();
          fallbackData.title = activeJavaTopic;
          setJavaTopicData(fallbackData);
        } else {
          const data = await res.json();
          setJavaTopicData(data);
        }
      } catch (err) {
        console.error(err);
        setJavaTopicData(null);
      } finally {
        setJavaTopicLoading(false);
      }
    };
    fetchJavaTopicData();
  }, [activeJavaTopic]);

  // Fetch VLSI topic data
  useEffect(() => {
    if (!activeVlsiTopic) return;
    const fetchVlsiTopicData = async () => {
      setVlsiTopicLoading(true);
      try {
        const res = await fetch(`/data/vlsi-topics/${encodeURIComponent(activeVlsiTopic)}.json`);
        if (!res.ok) {
          const fallbackRes = await fetch(`/data/vlsi-topics/Fallback.json`);
          if (!fallbackRes.ok) throw new Error('VLSI topic and fallback not found');
          const fallbackData = await fallbackRes.json();
          fallbackData.title = activeVlsiTopic;
          setVlsiTopicData(fallbackData);
        } else {
          const data = await res.json();
          setVlsiTopicData(data);
        }
      } catch (err) {
        console.error(err);
        setVlsiTopicData(null);
      } finally {
        setVlsiTopicLoading(false);
      }
    };
    fetchVlsiTopicData();
  }, [activeVlsiTopic]);

  // Fetch Embedded topic data
  useEffect(() => {
    if (!activeEmbeddedTopic) return;
    const fetchEmbeddedTopicData = async () => {
      setEmbeddedTopicLoading(true);
      try {
        const res = await fetch(`/data/embedded-topics/${encodeURIComponent(activeEmbeddedTopic)}.json`);
        if (!res.ok) throw new Error('Topic not found');
        const data = await res.json();
        setEmbeddedTopicData(data);
      } catch (err) {
        console.error(err);
        setEmbeddedTopicData(null);
      } finally {
        setEmbeddedTopicLoading(false);
      }
    };
    fetchEmbeddedTopicData();
  }, [activeEmbeddedTopic]);

  // Fetch AI topic data
  useEffect(() => {
    if (!activeAITopic) return;
    const fetchAITopicData = async () => {
      setAiTopicLoading(true);
      try {
        const res = await fetch(`/data/ai-topics/${encodeURIComponent(activeAITopic).replace(/%3A/g, '').replace(/%2F/g, '')}.json`);
        if (!res.ok) throw new Error('Topic not found');
        const data = await res.json();
        setAiTopicData(data);
      } catch (err) {
        console.error(err);
        setAiTopicData(null);
      } finally {
        setAiTopicLoading(false);
      }
    };
    fetchAITopicData();
  }, [activeAITopic]);

  // Fetch ML topic data
  useEffect(() => {
    if (!activeMLTopic) return;
    const fetchMLTopicData = async () => {
      setMlTopicLoading(true);
      try {
        const res = await fetch(`/data/ml-topics/${encodeURIComponent(activeMLTopic).replace(/%3A/g, '').replace(/%2F/g, '')}.json`);
        if (!res.ok) throw new Error('Topic not found');
        const data = await res.json();
        setMlTopicData(data);
      } catch (err) {
        console.error(err);
        setMlTopicData(null);
      } finally {
        setMlTopicLoading(false);
      }
    };
    fetchMLTopicData();
  }, [activeMLTopic]);

  // Fetch Cloud topic data
  useEffect(() => {
    if (!activeCloudTopic) return;
    const fetchCloudTopicData = async () => {
      setCloudTopicLoading(true);
      try {
        const res = await fetch(`/data/cloud-topics/${encodeURIComponent(activeCloudTopic).replace(/%3A/g, '').replace(/%2F/g, '')}.json`);
        if (!res.ok) throw new Error('Topic not found');
        const data = await res.json();
        setCloudTopicData(data);
      } catch (err) {
        console.error(err);
        setCloudTopicData(null);
      } finally {
        setCloudTopicLoading(false);
      }
    };
    fetchCloudTopicData();
  }, [activeCloudTopic]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on local state
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          (p.technologyStack && p.technologyStack.some(t => t.toLowerCase().includes(search.toLowerCase())));
      const matchCategory = category === 'All' || p.category === category;
      const matchDifficulty = difficulty === 'All' || p.difficulty === difficulty;
      return matchSearch && matchCategory && matchDifficulty;
    });
  }, [projects, search, category, difficulty]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    if (category !== 'Python Projects') {
      setActiveTopic(null);
    }
    if (category !== 'Java Projects') {
      setActiveJavaTopic(null);
    }
    if (category !== 'VLSI Projects') {
      setActiveVlsiTopic(null);
    }

    if (category !== 'Embedded Systems Projects') {
      setActiveEmbeddedTopic(null);
    }
    if (category !== 'Artificial Intelligence Projects') {
      setActiveAITopic(null);
    }
    if (category !== 'Machine Learning Projects') {
      setActiveMLTopic(null);
    }
    if (category !== 'Cloud Computing Projects') {
      setActiveCloudTopic(null);
    }
  }, [search, category, difficulty]);

  const filteredTopics = useMemo(() => {
    return PYTHON_TOPICS.filter(t => t.toLowerCase().includes(topicSearchQuery.toLowerCase()));
  }, [topicSearchQuery]);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

  const handleNextTopic = () => {
    const currentIndex = PYTHON_TOPICS.indexOf(activeTopic);
    if (currentIndex < PYTHON_TOPICS.length - 1) {
      setActiveTopic(PYTHON_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevTopic = () => {
    const currentIndex = PYTHON_TOPICS.indexOf(activeTopic);
    if (currentIndex > 0) {
      setActiveTopic(PYTHON_TOPICS[currentIndex - 1]);
    }
  };

  // Java topic handlers
  const filteredJavaTopics = useMemo(() => {
    return JAVA_TOPICS.filter(t => t.toLowerCase().includes(javaTopicSearchQuery.toLowerCase()));
  }, [javaTopicSearchQuery]);

  const handleJavaTopicClick = (topic) => {
    setActiveJavaTopic(topic);
  };

  const handleNextJavaTopic = () => {
    const currentIndex = JAVA_TOPICS.indexOf(activeJavaTopic);
    if (currentIndex < JAVA_TOPICS.length - 1) {
      setActiveJavaTopic(JAVA_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevJavaTopic = () => {
    const currentIndex = JAVA_TOPICS.indexOf(activeJavaTopic);
    if (currentIndex > 0) {
      setActiveJavaTopic(JAVA_TOPICS[currentIndex - 1]);
    }
  };

  // VLSI topic handlers
  const filteredVlsiTopics = useMemo(() => {
    return VLSI_TOPICS.filter(t => t.toLowerCase().includes(vlsiTopicSearchQuery.toLowerCase()));
  }, [vlsiTopicSearchQuery]);

  const handleVlsiTopicClick = (topic) => {
    setActiveVlsiTopic(topic);
  };

  const handleNextVlsiTopic = () => {
    const currentIndex = VLSI_TOPICS.indexOf(activeVlsiTopic);
    if (currentIndex < VLSI_TOPICS.length - 1) {
      setActiveVlsiTopic(VLSI_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevVlsiTopic = () => {
    const currentIndex = VLSI_TOPICS.indexOf(activeVlsiTopic);
    if (currentIndex > 0) {
      setActiveVlsiTopic(VLSI_TOPICS[currentIndex - 1]);
    }
  };

  // Embedded topic handlers
  const filteredEmbeddedTopics = useMemo(() => {
    return EMBEDDED_TOPICS.filter(t => t.toLowerCase().includes(embeddedTopicSearchQuery.toLowerCase()));
  }, [embeddedTopicSearchQuery]);

  const handleEmbeddedTopicClick = (topic) => {
    setActiveEmbeddedTopic(topic);
  };

  const handleNextEmbeddedTopic = () => {
    const currentIndex = EMBEDDED_TOPICS.indexOf(activeEmbeddedTopic);
    if (currentIndex < EMBEDDED_TOPICS.length - 1) {
      setActiveEmbeddedTopic(EMBEDDED_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevEmbeddedTopic = () => {
    const currentIndex = EMBEDDED_TOPICS.indexOf(activeEmbeddedTopic);
    if (currentIndex > 0) {
      setActiveEmbeddedTopic(EMBEDDED_TOPICS[currentIndex - 1]);
    }
  };

  // AI topic handlers
  const filteredAITopics = useMemo(() => {
    return AI_TOPICS.filter(t => t.toLowerCase().includes(aiTopicSearchQuery.toLowerCase()));
  }, [aiTopicSearchQuery]);

  const handleAITopicClick = (topic) => {
    setActiveAITopic(topic);
  };

  const handleNextAITopic = () => {
    const currentIndex = AI_TOPICS.indexOf(activeAITopic);
    if (currentIndex < AI_TOPICS.length - 1) {
      setActiveAITopic(AI_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevAITopic = () => {
    const currentIndex = AI_TOPICS.indexOf(activeAITopic);
    if (currentIndex > 0) {
      setActiveAITopic(AI_TOPICS[currentIndex - 1]);
    }
  };

  // ML topic handlers
  const filteredMLTopics = useMemo(() => {
    return ML_TOPICS.filter(t => t.toLowerCase().includes(mlTopicSearchQuery.toLowerCase()));
  }, [mlTopicSearchQuery]);

  const handleMLTopicClick = (topic) => {
    setActiveMLTopic(topic);
  };

  const handleNextMLTopic = () => {
    const currentIndex = ML_TOPICS.indexOf(activeMLTopic);
    if (currentIndex < ML_TOPICS.length - 1) {
      setActiveMLTopic(ML_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevMLTopic = () => {
    const currentIndex = ML_TOPICS.indexOf(activeMLTopic);
    if (currentIndex > 0) {
      setActiveMLTopic(ML_TOPICS[currentIndex - 1]);
    }
  };

  // Cloud topic handlers
  const filteredCloudTopics = useMemo(() => {
    return CLOUD_TOPICS.filter(t => t.toLowerCase().includes(cloudTopicSearchQuery.toLowerCase()));
  }, [cloudTopicSearchQuery]);

  const handleCloudTopicClick = (topic) => {
    setActiveCloudTopic(topic);
  };

  const handleNextCloudTopic = () => {
    const currentIndex = CLOUD_TOPICS.indexOf(activeCloudTopic);
    if (currentIndex < CLOUD_TOPICS.length - 1) {
      setActiveCloudTopic(CLOUD_TOPICS[currentIndex + 1]);
    }
  };

  const handlePrevCloudTopic = () => {
    const currentIndex = CLOUD_TOPICS.indexOf(activeCloudTopic);
    if (currentIndex > 0) {
      setActiveCloudTopic(CLOUD_TOPICS[currentIndex - 1]);
    }
  };

  const viewProjectDetails = (projectId) => {
    setSelectedProjectId(projectId);
    const proj = projects.find(p => p.id === projectId);
    if (proj && proj.category === 'VLSI Projects') {
      setActivePage('vlsiProjectDetail');
    } else {
      setActivePage('projectDetail');
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">Engineering Project Repository</h1>
        <p className="projects-subtitle">
          Explore complete engineering project blueprints, source code, and detailed architectures.
        </p>
      </div>

      <div className="categories-tabs">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`category-tab ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={`projects-page-wrapper ${(category === 'Python Projects' || category === 'Java Projects' || category === 'VLSI Projects' || category === 'Embedded Systems Projects' || category === 'Artificial Intelligence Projects' || category === 'Machine Learning Projects' || category === 'Cloud Computing Projects') ? 'has-sidebar' : ''}`}>
        <div className="projects-main-content">
          <div className="filters-bar" style={{ display: (activeTopic || activeVlsiTopic || activeJavaTopic || activeEmbeddedTopic || activeAITopic || activeMLTopic || activeCloudTopic) ? 'none' : 'flex' }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or technology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="difficulty-filter"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'All' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loading-message">Loading projects...</div>
          ) : activeVlsiTopic ? (
            <div className="learning-content-view">
              <button className="back-to-projects-btn" onClick={() => setActiveVlsiTopic(null)}>
                &larr; Back to VLSI Projects
              </button>
              {vlsiTopicLoading ? (
                <div className="loading-message">Loading topic content...</div>
              ) : vlsiTopicData ? (
                <>
                  <h2 className="learning-topic-title">⚡ {vlsiTopicData.title || activeVlsiTopic}</h2>

                  <div className="learning-section theory">
                    <h3>1. Introduction</h3>
                    <p><strong>Definition:</strong> {vlsiTopicData.introduction?.definition}</p>
                    <p><strong>Purpose:</strong> {vlsiTopicData.introduction?.purpose}</p>
                    <p><strong>Importance in VLSI Industry:</strong> {vlsiTopicData.introduction?.importance}</p>
                  </div>

                  <div className="learning-section theory">
                    <h3>2. Detailed Theory</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{vlsiTopicData.detailed_theory}</p>
                  </div>

                  {vlsiTopicData.architecture && (
                    <div className="learning-section theory">
                      <h3>3. Architecture / Block Diagram</h3>
                      <p>{vlsiTopicData.architecture.description}</p>
                      {vlsiTopicData.architecture.block_diagram_text && (
                        <pre style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', overflowX: 'auto' }}>
                          {vlsiTopicData.architecture.block_diagram_text}
                        </pre>
                      )}
                      {vlsiTopicData.architecture.components?.length > 0 && (
                        <ul style={{ marginTop: '12px' }}>
                          {vlsiTopicData.architecture.components.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      )}
                    </div>
                  )}

                  {vlsiTopicData.working_principle && (
                    <div className="learning-section theory">
                      <h3>4. Working Principle</h3>
                      {vlsiTopicData.working_principle.steps?.length > 0 && (
                        <ol>{vlsiTopicData.working_principle.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                      )}
                      <p><strong>Internal Operation:</strong> {vlsiTopicData.working_principle.internal_operation}</p>
                      <p><strong>Signal Flow:</strong> {vlsiTopicData.working_principle.signal_flow}</p>
                    </div>
                  )}

                  {vlsiTopicData.hdl_code && (vlsiTopicData.hdl_code.vhdl || vlsiTopicData.hdl_code.verilog) && (
                    <div className="learning-section syntax">
                      <h3>5. HDL Code</h3>
                      {vlsiTopicData.hdl_code.vhdl && (
                        <div style={{ marginBottom: '16px' }}>
                          <strong>VHDL:</strong>
                          <pre style={{ marginTop: '8px' }}><code>{vlsiTopicData.hdl_code.vhdl}</code></pre>
                        </div>
                      )}
                      {vlsiTopicData.hdl_code.verilog && (
                        <div style={{ marginBottom: '16px' }}>
                          <strong>Verilog:</strong>
                          <pre style={{ marginTop: '8px' }}><code>{vlsiTopicData.hdl_code.verilog}</code></pre>
                        </div>
                      )}
                      {vlsiTopicData.hdl_code.explanation && (
                        <p><strong>Explanation:</strong> {vlsiTopicData.hdl_code.explanation}</p>
                      )}
                    </div>
                  )}

                  {vlsiTopicData.truth_table && (
                    <div className="learning-section theory">
                      <h3>7. Truth Table</h3>
                      <table className="topic-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            {[...vlsiTopicData.truth_table.inputs, ...vlsiTopicData.truth_table.outputs].map((h, i) => (
                              <th key={i} style={{ border: '1px solid var(--border-color)', padding: '8px', background: 'var(--bg-tertiary)' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {vlsiTopicData.truth_table.table?.map((row, i) => (
                            <tr key={i}>{row.map((cell, j) => <td key={j} style={{ border: '1px solid var(--border-color)', padding: '8px', textAlign: 'center' }}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {vlsiTopicData.timing_diagram && (
                    <div className="learning-section theory">
                      <h3>8. Timing Diagram</h3>
                      <p>{vlsiTopicData.timing_diagram.description}</p>
                      {vlsiTopicData.timing_diagram.signals?.length > 0 && (
                        <pre style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace' }}>
                          {vlsiTopicData.timing_diagram.signals.join('\n')}
                        </pre>
                      )}
                    </div>
                  )}

                  <div className="learning-section examples">
                    <h3>9. Practical Examples</h3>
                    {vlsiTopicData.examples?.map((ex, i) => (
                      <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 12px 0', color: 'var(--color-primary)' }}>{ex.level} Example: {ex.title}</h4>
                        <pre><code>{ex.code}</code></pre>
                        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                          <strong>Output:</strong><br />
                          <pre style={{ margin: 0, background: 'transparent', padding: 0 }}><code>{ex.output}</code></pre>
                        </div>
                        <p style={{ marginTop: '12px', marginBottom: 0 }}><strong>Explanation:</strong> {ex.explanation}</p>
                      </div>
                    ))}
                  </div>

                  {vlsiTopicData.visuals && (
                    <div className="learning-section theory">
                      <h3>10. Visual Tables</h3>
                      {vlsiTopicData.visuals.tables?.map((table, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                          <h4>{table.title}</h4>
                          <table className="topic-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
                            <thead>
                              <tr>{table.headers?.map((h, j) => <th key={j} style={{ border: '1px solid var(--border-color)', padding: '8px', background: 'var(--bg-tertiary)' }}>{h}</th>)}</tr>
                            </thead>
                            <tbody>
                              {table.rows?.map((row, j) => (
                                <tr key={j}>{row.map((cell, k) => <td key={k} style={{ border: '1px solid var(--border-color)', padding: '8px' }}>{cell}</td>)}</tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                      {vlsiTopicData.visuals.comparisons?.map((comp, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                          <strong>{comp.concept_a} vs {comp.concept_b}:</strong> {comp.explanation}
                        </div>
                      ))}
                    </div>
                  )}

                  {vlsiTopicData.design_errors?.length > 0 && (
                    <div className="learning-section examples">
                      <h3>12. Common Design Errors</h3>
                      {vlsiTopicData.design_errors.map((e, i) => (
                        <div key={i} style={{ marginBottom: '20px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', borderLeft: '4px solid var(--color-error)' }}>
                          <h4 style={{ color: 'var(--color-error)', margin: '0 0 8px 0' }}>{e.title}</h4>
                          <p><strong>Description:</strong> {e.description}</p>
                          <p><strong>Cause:</strong> {e.cause}</p>
                          <p><strong>Fix:</strong> {e.fix}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {vlsiTopicData.tools?.length > 0 && (
                    <div className="learning-section theory">
                      <h3>13. Tools Used</h3>
                      {vlsiTopicData.tools.map((t, i) => (
                        <div key={i} style={{ marginBottom: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                          <strong>{t.name}:</strong> {t.usage}
                        </div>
                      ))}
                    </div>
                  )}

                  {vlsiTopicData.interview_questions && (
                    <div className="learning-section practice">
                      <h3>14. Interview Questions</h3>
                      <div style={{ marginBottom: '16px' }}>
                        <h4>Basic Questions</h4>
                        {vlsiTopicData.interview_questions.basic?.map((q, i) => (
                          <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                            <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                          </details>
                        ))}
                      </div>
                      {vlsiTopicData.interview_questions.intermediate?.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <h4>Intermediate Questions</h4>
                          {vlsiTopicData.interview_questions.intermediate.map((q, i) => (
                            <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                              <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                            </details>
                          ))}
                        </div>
                      )}
                      {vlsiTopicData.interview_questions.advanced?.length > 0 && (
                        <div>
                          <h4>Advanced Questions</h4>
                          {vlsiTopicData.interview_questions.advanced.map((q, i) => (
                            <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                              <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                            </details>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {vlsiTopicData.practice_problems && (
                    <div className="learning-section practice">
                      <h3>15. Practice Problems</h3>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <h4>Easy</h4>
                          <ul style={{ paddingLeft: '20px' }}>{vlsiTopicData.practice_problems.easy?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4>Medium</h4>
                          <ul style={{ paddingLeft: '20px' }}>{vlsiTopicData.practice_problems.medium?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4>Hard</h4>
                          <ul style={{ paddingLeft: '20px' }}>{vlsiTopicData.practice_problems.hard?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {vlsiTopicData.mini_exercises?.length > 0 && (
                    <div className="learning-section examples">
                      <h3>16. Mini Design Exercises</h3>
                      {vlsiTopicData.mini_exercises.map((ex, i) => (
                        <div key={i} style={{ marginBottom: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                          <h4>Exercise {i + 1}</h4>
                          <p><strong>Problem:</strong> {ex.problem}</p>
                          <p><strong>Circuit Design:</strong> {ex.circuit_design}</p>
                          <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View HDL Solution</summary>
                            <pre style={{ marginTop: '12px' }}><code>{ex.hdl_solution}</code></pre>
                            <p><strong>Explanation:</strong> {ex.explanation}</p>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}

                  {vlsiTopicData.real_world_applications?.length > 0 && (
                    <div className="learning-section theory">
                      <h3>17. Real World Applications</h3>
                      <ul>
                        {vlsiTopicData.real_world_applications.map((app, i) => (
                          <li key={i} style={{ marginBottom: '8px' }}>
                            <strong>{app.field}:</strong> {app.explanation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {vlsiTopicData.best_practices?.length > 0 && (
                    <div className="learning-section theory">
                      <h3>18. Best Practices</h3>
                      <ul style={{ paddingLeft: '20px' }}>
                        {vlsiTopicData.best_practices.map((bp, i) => <li key={i} style={{ marginBottom: '6px' }}>{bp}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="learning-section theory">
                    <h3>19. Summary</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                      {vlsiTopicData.summary?.map((s, i) => <li key={i} style={{ marginBottom: '6px' }}>{s}</li>)}
                    </ul>
                  </div>

                  {vlsiTopicData.quiz?.length > 0 && (
                    <div className="learning-section practice">
                      <h3>20. Topic Quiz</h3>
                      {vlsiTopicData.quiz.map((q, i) => (
                        <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                          <p><strong>Q{i + 1}: {q.question}</strong></p>
                          <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: '12px 0' }}>
                            {q.options.map((opt, j) => (
                              <li key={j} style={{ padding: '8px', border: '1px solid var(--border-color)', marginBottom: '8px', borderRadius: '4px' }}>{opt}</li>
                            ))}
                          </ul>
                          <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View Answer</summary>
                            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,200,0,0.1)', borderRadius: '4px', borderLeft: '4px solid var(--color-success)' }}>
                              <strong>Correct Answer:</strong> {q.answer}<br /><br />
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="learning-section theory">
                  <p>Loading content for <strong>{activeVlsiTopic}</strong>. Please wait...</p>
                </div>
              )}

              <div className="learning-navigation">
                <button
                  className="nav-btn prev-btn"
                  onClick={handlePrevVlsiTopic}
                  disabled={VLSI_TOPICS.indexOf(activeVlsiTopic) === 0}
                >
                  &larr; Previous Topic
                </button>
                <button
                  className="nav-btn next-btn"
                  onClick={handleNextVlsiTopic}
                  disabled={VLSI_TOPICS.indexOf(activeVlsiTopic) === VLSI_TOPICS.length - 1}
                >
                  Next Topic &rarr;
                </button>
              </div>
            </div>
          ) : activeJavaTopic ? (
            <div className="learning-content-view">
              <button className="back-to-projects-btn" onClick={() => setActiveJavaTopic(null)}>
                &larr; Back to Java Projects
              </button>
              {javaTopicLoading ? (
                <div className="loading-message">Loading topic content...</div>
              ) : javaTopicData ? (
                <>
                  <h2 className="learning-topic-title">{javaTopicData.title || activeJavaTopic}</h2>

                  <div className="learning-section theory">
                    <h3>1. Introduction</h3>
                    <p><strong>What it is:</strong> {javaTopicData.introduction?.what_it_is}</p>
                    <p><strong>Why it is important:</strong> {javaTopicData.introduction?.why_important}</p>
                    <div style={{ marginTop: '12px' }}>
                      <strong>Real World Applications:</strong>
                      <ul>
                        {javaTopicData.introduction?.real_world?.map((rw, i) => <li key={i}>{rw}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="learning-section theory">
                    <h3>2. Detailed Theory</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{javaTopicData.detailed_theory}</p>
                  </div>

                  <div className="learning-section theory">
                    <h3>3. Key Features</h3>
                    <ul>
                      {javaTopicData.key_features?.features?.map((f, i) => (
                        <li key={i}><strong>{f.name}:</strong> {f.description}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <strong>Advantages:</strong>
                        <ul>{javaTopicData.key_features?.advantages?.map((a, i) => <li key={i}>{a}</li>)}</ul>
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong>Limitations:</strong>
                        <ul>{javaTopicData.key_features?.limitations?.map((l, i) => <li key={i}>{l}</li>)}</ul>
                      </div>
                    </div>
                  </div>

                  <div className="learning-section syntax">
                    <h3>4. Syntax</h3>
                    <p>{javaTopicData.syntax?.explanation}</p>
                    <div style={{ marginTop: '12px' }}>
                      <strong>Syntax Breakdown:</strong>
                      <ul>{javaTopicData.syntax?.breakdown?.map((b, i) => <li key={i}>{b}</li>)}</ul>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <strong>Rules and Best Practices:</strong>
                      <ul>{javaTopicData.syntax?.rules?.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </div>
                  </div>

                  <div className="learning-section examples">
                    <h3>5. Multiple Examples</h3>
                    {javaTopicData.examples?.map((ex, i) => (
                      <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 12px 0', color: 'var(--color-primary)' }}>{ex.level} Example: {ex.title}</h4>
                        <pre><code>{ex.code}</code></pre>
                        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                          <strong>Output:</strong><br />
                          <pre style={{ margin: 0, background: 'transparent', padding: 0 }}><code>{ex.output}</code></pre>
                        </div>
                        <p style={{ marginTop: '12px', marginBottom: 0 }}><strong>Explanation:</strong> {ex.explanation}</p>
                      </div>
                    ))}
                  </div>

                  {javaTopicData.visuals && (
                    <div className="learning-section theory">
                      <h3>6. Visual Learning Section</h3>
                      {javaTopicData.visuals.tables?.map((table, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                          <h4>{table.title}</h4>
                          <table className="topic-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
                            <thead>
                              <tr>{table.headers?.map((h, j) => <th key={j} style={{ border: '1px solid var(--border-color)', padding: '8px', background: 'var(--bg-tertiary)' }}>{h}</th>)}</tr>
                            </thead>
                            <tbody>
                              {table.rows?.map((row, j) => (
                                <tr key={j}>
                                  {row.map((cell, k) => <td key={k} style={{ border: '1px solid var(--border-color)', padding: '8px' }}>{cell}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                      {javaTopicData.visuals.comparisons?.map((comp, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                          <strong>{comp.concept_a} vs {comp.concept_b}:</strong> {comp.explanation}
                        </div>
                      ))}
                    </div>
                  )}

                  {javaTopicData.methods && javaTopicData.methods.length > 0 && (
                    <div className="learning-section theory">
                      <h3>7. Common Methods / Functions</h3>
                      {javaTopicData.methods.map((m, i) => (
                        <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                          <h4 style={{ color: 'var(--color-secondary)' }}>{m.name}</h4>
                          <p style={{ margin: '4px 0' }}>{m.description}</p>
                          <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                            <div><strong>Parameters:</strong> {m.parameters}</div>
                            <div><strong>Returns:</strong> {m.return_value}</div>
                            <div style={{ marginTop: '4px' }}><code>{m.example_usage}</code></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {javaTopicData.mistakes && javaTopicData.mistakes.length > 0 && (
                    <div className="learning-section examples">
                      <h3>8. Common Mistakes</h3>
                      {javaTopicData.mistakes.map((m, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                          <h4 style={{ color: 'var(--color-error)' }}>{m.title}</h4>
                          <p>{m.description}</p>
                          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <strong>Wrong Example:</strong>
                              <pre style={{ borderLeft: '4px solid var(--color-error)' }}><code>{m.wrong_example}</code></pre>
                            </div>
                            <div style={{ flex: 1 }}>
                              <strong>Correct Example:</strong>
                              <pre style={{ borderLeft: '4px solid var(--color-success)' }}><code>{m.correct_example}</code></pre>
                            </div>
                          </div>
                          <p style={{ marginTop: '8px', fontSize: '0.9em', color: 'var(--text-secondary)' }}><strong>💡 Tip:</strong> {m.debugging_tip}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {javaTopicData.interview_questions && (
                    <div className="learning-section practice">
                      <h3>9. Interview Questions</h3>
                      <div style={{ marginBottom: '16px' }}>
                        <h4>Basic Questions</h4>
                        {javaTopicData.interview_questions.basic?.map((q, i) => (
                          <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                            <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                          </details>
                        ))}
                      </div>
                      {javaTopicData.interview_questions.intermediate?.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <h4>Intermediate Questions</h4>
                          {javaTopicData.interview_questions.intermediate.map((q, i) => (
                            <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                              <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                            </details>
                          ))}
                        </div>
                      )}
                      {javaTopicData.interview_questions.advanced?.length > 0 && (
                        <div>
                          <h4>Advanced Questions</h4>
                          {javaTopicData.interview_questions.advanced.map((q, i) => (
                            <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                              <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                            </details>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {javaTopicData.practice_questions && (
                    <div className="learning-section practice">
                      <h3>10. Practice Questions</h3>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <h4>Easy</h4>
                          <ul style={{ paddingLeft: '20px' }}>{javaTopicData.practice_questions.easy?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4>Medium</h4>
                          <ul style={{ paddingLeft: '20px' }}>{javaTopicData.practice_questions.medium?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4>Hard</h4>
                          <ul style={{ paddingLeft: '20px' }}>{javaTopicData.practice_questions.hard?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {javaTopicData.coding_challenges && javaTopicData.coding_challenges.length > 0 && (
                    <div className="learning-section examples">
                      <h3>11. Coding Challenges</h3>
                      {javaTopicData.coding_challenges.map((c, i) => (
                        <div key={i} style={{ marginBottom: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                          <h4>Challenge {i + 1}</h4>
                          <p><strong>Problem:</strong> {c.statement}</p>
                          <div style={{ display: 'flex', gap: '16px', margin: '12px 0' }}>
                            <div style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                              <strong>Input/Output Example:</strong><br />
                              Input: <code>{c.input}</code><br />
                              Output: <code>{c.output}</code>
                            </div>
                            <div style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                              <strong>Constraints:</strong><br />
                              {c.constraints}
                            </div>
                          </div>
                          <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View Sample Solution</summary>
                            <pre style={{ marginTop: '12px' }}><code>{c.solution}</code></pre>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}

                  {javaTopicData.real_world_applications && javaTopicData.real_world_applications.length > 0 && (
                    <div className="learning-section theory">
                      <h3>12. Real-World Applications</h3>
                      <ul>
                        {javaTopicData.real_world_applications.map((app, i) => (
                          <li key={i} style={{ marginBottom: '8px' }}>
                            <strong>{app.field}:</strong> {app.explanation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {javaTopicData.best_practices && javaTopicData.best_practices.length > 0 && (
                    <div className="learning-section theory">
                      <h3>13. Best Practices</h3>
                      <ul style={{ paddingLeft: '20px' }}>
                        {javaTopicData.best_practices.map((bp, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="learning-section theory">
                    <h3>14. Summary</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                      {javaTopicData.summary?.map((s, i) => (
                        <li key={i} style={{ marginBottom: '6px' }}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {javaTopicData.quiz && javaTopicData.quiz.length > 0 && (
                    <div className="learning-section practice">
                      <h3>15. Topic Quiz</h3>
                      {javaTopicData.quiz.map((q, i) => (
                        <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                          <p><strong>Q{i + 1}: {q.question}</strong></p>
                          <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: '12px 0' }}>
                            {q.options.map((opt, j) => (
                              <li key={j} style={{ padding: '8px', border: '1px solid var(--border-color)', marginBottom: '8px', borderRadius: '4px' }}>
                                {opt}
                              </li>
                            ))}
                          </ul>
                          <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View Answer</summary>
                            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,200,0,0.1)', borderRadius: '4px', borderLeft: '4px solid var(--color-success)' }}>
                              <strong>Correct Answer:</strong> {q.answer}<br /><br />
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="learning-section theory">
                  <p>Content for <strong>{activeJavaTopic}</strong> is currently being generated or is unavailable.</p>
                </div>
              )}

              <div className="learning-navigation">
                <button
                  className="nav-btn prev-btn"
                  onClick={handlePrevJavaTopic}
                  disabled={JAVA_TOPICS.indexOf(activeJavaTopic) === 0}
                >
                  &larr; Previous Topic
                </button>
                <button
                  className="nav-btn next-btn"
                  onClick={handleNextJavaTopic}
                  disabled={JAVA_TOPICS.indexOf(activeJavaTopic) === JAVA_TOPICS.length - 1}
                >
                  Next Topic &rarr;
                </button>
              </div>
            </div>
          ) : activeEmbeddedTopic ? (
             <div className="learning-content-view">
               <button className="back-to-projects-btn" onClick={() => setActiveEmbeddedTopic(null)}>
                 &larr; Back to Embedded Projects
               </button>
               {embeddedTopicLoading ? (
                 <div className="loading-message">Loading topic content...</div>
               ) : embeddedTopicData ? (
                 <>
                   <h2 className="learning-topic-title">⚙️ {embeddedTopicData.title || activeEmbeddedTopic}</h2>

                   {embeddedTopicData.topic_overview && (
                     <div className="learning-section theory">
                       <h3>1. Topic Overview</h3>
                       <p>{embeddedTopicData.topic_overview}</p>
                     </div>
                   )}

                   {embeddedTopicData.core_concepts && embeddedTopicData.core_concepts.length > 0 && (
                     <div className="learning-section theory">
                       <h3>2. Core Concepts</h3>
                       <ul>
                         {embeddedTopicData.core_concepts.map((concept, i) => <li key={i}>{concept}</li>)}
                       </ul>
                     </div>
                   )}

                   {embeddedTopicData.architecture_working_principle && (
                     <div className="learning-section theory">
                       <h3>3. Architecture / Working Principle</h3>
                       <p>{embeddedTopicData.architecture_working_principle}</p>
                     </div>
                   )}

                   {embeddedTopicData.real_world_applications && embeddedTopicData.real_world_applications.length > 0 && (
                     <div className="learning-section theory">
                       <h3>4. Real-World Applications</h3>
                       <ul>
                         {embeddedTopicData.real_world_applications.map((app, i) => <li key={i}>{app}</li>)}
                       </ul>
                     </div>
                   )}

                   {embeddedTopicData.advantages && embeddedTopicData.advantages.length > 0 && (
                     <div className="learning-section theory">
                       <h3>5. Advantages</h3>
                       <ul>
                         {embeddedTopicData.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                       </ul>
                     </div>
                   )}

                   {embeddedTopicData.limitations && embeddedTopicData.limitations.length > 0 && (
                     <div className="learning-section theory">
                       <h3>6. Limitations</h3>
                       <ul>
                         {embeddedTopicData.limitations.map((lim, i) => <li key={i}>{lim}</li>)}
                       </ul>
                     </div>
                   )}

                   {embeddedTopicData.industry_use_cases && (
                     <div className="learning-section theory">
                       <h3>7. Industry Use Cases</h3>
                       <p>{embeddedTopicData.industry_use_cases}</p>
                     </div>
                   )}

                   {embeddedTopicData.best_practices && embeddedTopicData.best_practices.length > 0 && (
                     <div className="learning-section theory">
                       <h3>8. Best Practices</h3>
                       <ul>
                         {embeddedTopicData.best_practices.map((bp, i) => <li key={i}>{bp}</li>)}
                       </ul>
                     </div>
                   )}

                   {embeddedTopicData.interview_questions && embeddedTopicData.interview_questions.length > 0 && (
                     <div className="learning-section practice">
                       <h3>9. Interview Questions & Answers</h3>
                       {embeddedTopicData.interview_questions.map((q, i) => (
                         <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                           <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.q}</summary>
                           <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.a}</p>
                         </details>
                       ))}
                     </div>
                   )}

                   {embeddedTopicData.learning_outcomes && embeddedTopicData.learning_outcomes.length > 0 && (
                     <div className="learning-section theory">
                       <h3>10. Learning Outcomes</h3>
                       <ul>
                         {embeddedTopicData.learning_outcomes.map((lo, i) => <li key={i}>{lo}</li>)}
                       </ul>
                     </div>
                   )}

                 </>
               ) : (
                 <div className="learning-section theory">
                   <p>Content for <strong>{activeEmbeddedTopic}</strong> is currently being generated or is unavailable.</p>
                 </div>
               )}

               <div className="learning-navigation">
                 <button
                   className="nav-btn prev-btn"
                   onClick={handlePrevEmbeddedTopic}
                   disabled={EMBEDDED_TOPICS.indexOf(activeEmbeddedTopic) === 0}
                 >
                   &larr; Previous Topic
                 </button>
                 <button
                   className="nav-btn next-btn"
                   onClick={handleNextEmbeddedTopic}
                   disabled={EMBEDDED_TOPICS.indexOf(activeEmbeddedTopic) === EMBEDDED_TOPICS.length - 1}
                 >
                   Next Topic &rarr;
                 </button>
               </div>
             </div>

) : activeAITopic ? (
             <div className="learning-content-view">
               <button className="back-to-projects-btn" onClick={() => setActiveAITopic(null)}>
                 &larr; Back to AI Projects
               </button>
               {aiTopicLoading ? (
                 <div className="loading-message">Loading topic content...</div>
               ) : aiTopicData ? (
                 <>
                   <h2 className="learning-topic-title">🤖 {aiTopicData.title || activeAITopic}</h2>

                   {aiTopicData.topic_overview && (
                     <div className="learning-section theory">
                       <h3>1. Topic Overview</h3>
                       <p>{aiTopicData.topic_overview}</p>
                     </div>
                   )}

                   {aiTopicData.detailed_explanation && (
                     <div className="learning-section theory">
                       <h3>2. Detailed Explanation</h3>
                       <p>{aiTopicData.detailed_explanation}</p>
                     </div>
                   )}

                   {aiTopicData.key_concepts && aiTopicData.key_concepts.length > 0 && (
                     <div className="learning-section theory">
                       <h3>3. Key Concepts</h3>
                       <ul>
                         {aiTopicData.key_concepts.map((concept, i) => <li key={i}>{concept}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.architecture_workflow && (
                     <div className="learning-section theory">
                       <h3>4. Architecture / Workflow</h3>
                       <p>{aiTopicData.architecture_workflow}</p>
                     </div>
                   )}

                   {aiTopicData.algorithms_and_techniques && aiTopicData.algorithms_and_techniques.length > 0 && (
                     <div className="learning-section theory">
                       <h3>5. Algorithms and Techniques</h3>
                       <ul>
                         {aiTopicData.algorithms_and_techniques.map((algo, i) => <li key={i}>{algo}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.real_world_applications && aiTopicData.real_world_applications.length > 0 && (
                     <div className="learning-section theory">
                       <h3>6. Real-World Applications</h3>
                       <ul>
                         {aiTopicData.real_world_applications.map((app, i) => <li key={i}>{app}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.advantages && aiTopicData.advantages.length > 0 && (
                     <div className="learning-section theory">
                       <h3>7. Advantages</h3>
                       <ul>
                         {aiTopicData.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.challenges_limitations && aiTopicData.challenges_limitations.length > 0 && (
                     <div className="learning-section theory">
                       <h3>8. Challenges and Limitations</h3>
                       <ul>
                         {aiTopicData.challenges_limitations.map((lim, i) => <li key={i}>{lim}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.industry_use_cases && (
                     <div className="learning-section theory">
                       <h3>9. Industry Use Cases</h3>
                       <p>{aiTopicData.industry_use_cases}</p>
                     </div>
                   )}

                   {aiTopicData.best_practices && aiTopicData.best_practices.length > 0 && (
                     <div className="learning-section theory">
                       <h3>10. Best Practices</h3>
                       <ul>
                         {aiTopicData.best_practices.map((bp, i) => <li key={i}>{bp}</li>)}
                       </ul>
                     </div>
                   )}

                   {aiTopicData.interview_questions && aiTopicData.interview_questions.length > 0 && (
                     <div className="learning-section practice">
                       <h3>11. Interview Questions & Answers</h3>
                       {aiTopicData.interview_questions.map((q, i) => (
                         <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                           <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.q}</summary>
                           <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.a}</p>
                         </details>
                       ))}
                     </div>
                   )}

                   {aiTopicData.learning_outcomes && aiTopicData.learning_outcomes.length > 0 && (
                     <div className="learning-section theory">
                       <h3>12. Learning Outcomes</h3>
                       <ul>
                         {aiTopicData.learning_outcomes.map((lo, i) => <li key={i}>{lo}</li>)}
                       </ul>
                     </div>
                   )}

                 </>
               ) : (
                 <div className="learning-section theory">
                   <p>Content for <strong>{activeAITopic}</strong> is currently being generated or is unavailable.</p>
                 </div>
               )}

               <div className="learning-navigation">
                 <button
                   className="nav-btn prev-btn"
                   onClick={handlePrevAITopic}
                   disabled={AI_TOPICS.indexOf(activeAITopic) === 0}
                 >
                   &larr; Previous Topic
                 </button>
                 <button
                   className="nav-btn next-btn"
                   onClick={handleNextAITopic}
                   disabled={AI_TOPICS.indexOf(activeAITopic) === AI_TOPICS.length - 1}
                 >
                   Next Topic &rarr;
                 </button>
               </div>
             </div>

) : activeMLTopic ? (
             <div className="learning-content-view">
               <button className="back-to-projects-btn" onClick={() => setActiveMLTopic(null)}>
                 &larr; Back to ML Projects
               </button>
               {mlTopicLoading ? (
                 <div className="loading-message">Loading topic content...</div>
               ) : mlTopicData ? (
                 <>
                   <h2 className="learning-topic-title">🧠 {mlTopicData.title || activeMLTopic}</h2>

                   {mlTopicData.topic_overview && (
                     <div className="learning-section theory">
                       <h3>1. Topic Overview</h3>
                       <p>{mlTopicData.topic_overview}</p>
                     </div>
                   )}

                   {mlTopicData.detailed_explanation && (
                     <div className="learning-section theory">
                       <h3>2. Detailed Explanation</h3>
                       <p>{mlTopicData.detailed_explanation}</p>
                     </div>
                   )}

                   {mlTopicData.core_concepts && mlTopicData.core_concepts.length > 0 && (
                     <div className="learning-section theory">
                       <h3>3. Core Concepts</h3>
                       <ul>
                         {mlTopicData.core_concepts.map((concept, i) => <li key={i}>{concept}</li>)}
                       </ul>
                     </div>
                   )}

                   {mlTopicData.working_principle && (
                     <div className="learning-section theory">
                       <h3>4. Working Principle</h3>
                       <p>{mlTopicData.working_principle}</p>
                     </div>
                   )}

                   {mlTopicData.algorithm_flow && (
                     <div className="learning-section theory">
                       <h3>5. Algorithm Flow</h3>
                       <p>{mlTopicData.algorithm_flow}</p>
                     </div>
                   )}

                   {mlTopicData.architecture_workflow && (
                     <div className="learning-section theory">
                       <h3>6. Architecture / Workflow Diagram</h3>
                       <p>{mlTopicData.architecture_workflow}</p>
                     </div>
                   )}

                   {mlTopicData.mathematical_concepts && (
                     <div className="learning-section theory">
                       <h3>7. Mathematical Concepts</h3>
                       <p>{mlTopicData.mathematical_concepts}</p>
                     </div>
                   )}

                   {mlTopicData.real_world_applications && mlTopicData.real_world_applications.length > 0 && (
                     <div className="learning-section theory">
                       <h3>8. Real-World Applications</h3>
                       <ul>
                         {mlTopicData.real_world_applications.map((app, i) => <li key={i}>{app}</li>)}
                       </ul>
                     </div>
                   )}

                   {mlTopicData.advantages && mlTopicData.advantages.length > 0 && (
                     <div className="learning-section theory">
                       <h3>9. Advantages</h3>
                       <ul>
                         {mlTopicData.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                       </ul>
                     </div>
                   )}

                   {mlTopicData.disadvantages && mlTopicData.disadvantages.length > 0 && (
                     <div className="learning-section theory">
                       <h3>10. Disadvantages</h3>
                       <ul>
                         {mlTopicData.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
                       </ul>
                     </div>
                   )}

                   {mlTopicData.industry_use_cases && (
                     <div className="learning-section theory">
                       <h3>11. Industry Use Cases</h3>
                       <p>{mlTopicData.industry_use_cases}</p>
                     </div>
                   )}

                   {mlTopicData.best_practices && mlTopicData.best_practices.length > 0 && (
                     <div className="learning-section theory">
                       <h3>12. Best Practices</h3>
                       <ul>
                         {mlTopicData.best_practices.map((bp, i) => <li key={i}>{bp}</li>)}
                       </ul>
                     </div>
                   )}

                   {mlTopicData.interview_questions && mlTopicData.interview_questions.length > 0 && (
                     <div className="learning-section practice">
                       <h3>13. Interview Questions & Answers</h3>
                       {mlTopicData.interview_questions.map((q, i) => (
                         <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                           <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.q}</summary>
                           <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.a}</p>
                         </details>
                       ))}
                     </div>
                   )}

                   {mlTopicData.learning_outcomes && mlTopicData.learning_outcomes.length > 0 && (
                     <div className="learning-section theory">
                       <h3>14. Learning Outcomes</h3>
                       <ul>
                         {mlTopicData.learning_outcomes.map((lo, i) => <li key={i}>{lo}</li>)}
                       </ul>
                     </div>
                   )}

                 </>
               ) : (
                 <div className="learning-section theory">
                   <p>Content for <strong>{activeMLTopic}</strong> is currently being generated or is unavailable.</p>
                 </div>
               )}

               <div className="learning-navigation">
                 <button
                   className="nav-btn prev-btn"
                   onClick={handlePrevMLTopic}
                   disabled={ML_TOPICS.indexOf(activeMLTopic) === 0}
                 >
                   &larr; Previous Topic
                 </button>
                 <button
                   className="nav-btn next-btn"
                   onClick={handleNextMLTopic}
                   disabled={ML_TOPICS.indexOf(activeMLTopic) === ML_TOPICS.length - 1}
                 >
                   Next Topic &rarr;
                 </button>
               </div>
             </div>

) : activeCloudTopic ? (
             <div className="learning-content-view">
               <button className="back-to-projects-btn" onClick={() => setActiveCloudTopic(null)}>
                 &larr; Back to Cloud Projects
               </button>
               {cloudTopicLoading ? (
                 <div className="loading-message">Loading topic content...</div>
               ) : cloudTopicData ? (
                 <>
                   <h2 className="learning-topic-title">☁️ {cloudTopicData.title || activeCloudTopic}</h2>

                   {cloudTopicData.topic_overview && (
                     <div className="learning-section theory">
                       <h3>1. Topic Overview</h3>
                       <p>{cloudTopicData.topic_overview}</p>
                     </div>
                   )}

                   {cloudTopicData.detailed_explanation && (
                     <div className="learning-section theory">
                       <h3>2. Detailed Explanation</h3>
                       <p>{cloudTopicData.detailed_explanation}</p>
                     </div>
                   )}

                   {cloudTopicData.core_concepts && cloudTopicData.core_concepts.length > 0 && (
                     <div className="learning-section theory">
                       <h3>3. Core Concepts</h3>
                       <ul>
                         {cloudTopicData.core_concepts.map((concept, i) => <li key={i}>{concept}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.architecture && (
                     <div className="learning-section theory">
                       <h3>4. Architecture</h3>
                       <p>{cloudTopicData.architecture}</p>
                     </div>
                   )}

                   {cloudTopicData.working_principle && (
                     <div className="learning-section theory">
                       <h3>5. Working Principle</h3>
                       <p>{cloudTopicData.working_principle}</p>
                     </div>
                   )}

                   {cloudTopicData.service_components && cloudTopicData.service_components.length > 0 && (
                     <div className="learning-section theory">
                       <h3>6. Service Components</h3>
                       <ul>
                         {cloudTopicData.service_components.map((comp, i) => <li key={i}>{comp}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.workflow_diagram && (
                     <div className="learning-section theory">
                       <h3>7. Workflow Diagram</h3>
                       <p>{cloudTopicData.workflow_diagram}</p>
                     </div>
                   )}

                   {cloudTopicData.real_world_applications && cloudTopicData.real_world_applications.length > 0 && (
                     <div className="learning-section theory">
                       <h3>8. Real-World Applications</h3>
                       <ul>
                         {cloudTopicData.real_world_applications.map((app, i) => <li key={i}>{app}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.industry_use_cases && (
                     <div className="learning-section theory">
                       <h3>9. Industry Use Cases</h3>
                       <p>{cloudTopicData.industry_use_cases}</p>
                     </div>
                   )}

                   {cloudTopicData.advantages && cloudTopicData.advantages.length > 0 && (
                     <div className="learning-section theory">
                       <h3>10. Advantages</h3>
                       <ul>
                         {cloudTopicData.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.limitations && cloudTopicData.limitations.length > 0 && (
                     <div className="learning-section theory">
                       <h3>11. Limitations</h3>
                       <ul>
                         {cloudTopicData.limitations.map((lim, i) => <li key={i}>{lim}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.best_practices && cloudTopicData.best_practices.length > 0 && (
                     <div className="learning-section theory">
                       <h3>12. Best Practices</h3>
                       <ul>
                         {cloudTopicData.best_practices.map((bp, i) => <li key={i}>{bp}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.common_challenges && cloudTopicData.common_challenges.length > 0 && (
                     <div className="learning-section theory">
                       <h3>13. Common Challenges</h3>
                       <ul>
                         {cloudTopicData.common_challenges.map((ch, i) => <li key={i}>{ch}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.interview_questions && cloudTopicData.interview_questions.length > 0 && (
                     <div className="learning-section practice">
                       <h3>14. Interview Questions & Answers</h3>
                       {cloudTopicData.interview_questions.map((q, i) => (
                         <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                           <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.q}</summary>
                           <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.a}</p>
                         </details>
                       ))}
                     </div>
                   )}

                   {cloudTopicData.learning_outcomes && cloudTopicData.learning_outcomes.length > 0 && (
                     <div className="learning-section theory">
                       <h3>15. Learning Outcomes</h3>
                       <ul>
                         {cloudTopicData.learning_outcomes.map((lo, i) => <li key={i}>{lo}</li>)}
                       </ul>
                     </div>
                   )}

                   {cloudTopicData.references && cloudTopicData.references.length > 0 && (
                     <div className="learning-section theory">
                       <h3>16. References and Further Reading</h3>
                       <ul>
                         {cloudTopicData.references.map((ref, i) => <li key={i}>{ref}</li>)}
                       </ul>
                     </div>
                   )}

                 </>
               ) : (
                 <div className="learning-section theory">
                   <p>Content for <strong>{activeCloudTopic}</strong> is currently being generated or is unavailable.</p>
                 </div>
               )}

               <div className="learning-navigation">
                 <button
                   className="nav-btn prev-btn"
                   onClick={handlePrevCloudTopic}
                   disabled={CLOUD_TOPICS.indexOf(activeCloudTopic) === 0}
                 >
                   &larr; Previous Topic
                 </button>
                 <button
                   className="nav-btn next-btn"
                   onClick={handleNextCloudTopic}
                   disabled={CLOUD_TOPICS.indexOf(activeCloudTopic) === CLOUD_TOPICS.length - 1}
                 >
                   Next Topic &rarr;
                 </button>
               </div>
             </div>

) : activeTopic ? (
             <div className="learning-content-view">
               <button className="back-to-projects-btn" onClick={() => setActiveTopic(null)}>
                 &larr; Back to Python Projects
               </button>
               {topicLoading ? (
                 <div className="loading-message">Loading topic content...</div>
               ) : topicData ? (
                 <>
                   <h2 className="learning-topic-title">{topicData.title || activeTopic}</h2>
                   
                   <div className="learning-section theory">
                     <h3>1. Introduction</h3>
                     <p><strong>What it is:</strong> {topicData.introduction?.what_it_is}</p>
                     <p><strong>Why it is important:</strong> {topicData.introduction?.why_important}</p>
                     <div style={{ marginTop: '12px' }}>
                       <strong>Real World Applications:</strong>
                       <ul>
                         {topicData.introduction?.real_world?.map((rw, i) => <li key={i}>{rw}</li>)}
                       </ul>
                     </div>
                   </div>

                   <div className="learning-section theory">
                     <h3>2. Detailed Theory</h3>
                     <p style={{ whiteSpace: 'pre-wrap' }}>{topicData.detailed_theory}</p>
                   </div>

                   <div className="learning-section theory">
                     <h3>3. Key Features</h3>
                     <ul>
                       {topicData.key_features?.features?.map((f, i) => (
                         <li key={i}><strong>{f.name}:</strong> {f.description}</li>
                       ))}
                     </ul>
                     <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                       <div style={{ flex: 1 }}>
                         <strong>Advantages:</strong>
                         <ul>{topicData.key_features?.advantages?.map((a, i) => <li key={i}>{a}</li>)}</ul>
                       </div>
                       <div style={{ flex: 1 }}>
                         <strong>Limitations:</strong>
                         <ul>{topicData.key_features?.limitations?.map((l, i) => <li key={i}>{l}</li>)}</ul>
                       </div>
                     </div>
                   </div>

                   <div className="learning-section syntax">
                     <h3>4. Syntax</h3>
                     <p>{topicData.syntax?.explanation}</p>
                     <div style={{ marginTop: '12px' }}>
                       <strong>Syntax Breakdown:</strong>
                       <ul>{topicData.syntax?.breakdown?.map((b, i) => <li key={i}>{b}</li>)}</ul>
                     </div>
                     <div style={{ marginTop: '12px' }}>
                       <strong>Rules and Best Practices:</strong>
                       <ul>{topicData.syntax?.rules?.map((r, i) => <li key={i}>{r}</li>)}</ul>
                     </div>
                   </div>

                   <div className="learning-section examples">
                     <h3>5. Multiple Examples</h3>
                     {topicData.examples?.map((ex, i) => (
                       <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                         <h4 style={{ margin: '0 0 12px 0', color: 'var(--color-primary)' }}>{ex.level} Example: {ex.title}</h4>
                         <pre><code>{ex.code}</code></pre>
                         <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                           <strong>Output:</strong><br />
                           <pre style={{ margin: 0, background: 'transparent', padding: 0 }}><code>{ex.output}</code></pre>
                         </div>
                         <p style={{ marginTop: '12px', marginBottom: 0 }}><strong>Explanation:</strong> {ex.explanation}</p>
                       </div>
                     ))}
                   </div>

                   {topicData.visuals && (
                     <div className="learning-section theory">
                       <h3>6. Visual Learning Section</h3>
                       {topicData.visuals.tables?.map((table, i) => (
                         <div key={i} style={{ marginBottom: '20px' }}>
                           <h4>{table.title}</h4>
                           <table className="topic-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
                             <thead>
                               <tr>{table.headers?.map((h, j) => <th key={j} style={{ border: '1px solid var(--border-color)', padding: '8px', background: 'var(--bg-tertiary)' }}>{h}</th>)}</tr>
                             </thead>
                             <tbody>
                               {table.rows?.map((row, j) => (
                                 <tr key={j}>
                                   {row.map((cell, k) => <td key={k} style={{ border: '1px solid var(--border-color)', padding: '8px' }}>{cell}</td>)}
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                         </div>
                       ))}
                       {topicData.visuals.comparisons?.map((comp, i) => (
                         <div key={i} style={{ marginBottom: '16px' }}>
                           <strong>{comp.concept_a} vs {comp.concept_b}:</strong> {comp.explanation}
                         </div>
                       ))}
                     </div>
                   )}

                   {topicData.methods && topicData.methods.length > 0 && (
                     <div className="learning-section theory">
                       <h3>7. Common Methods / Functions</h3>
                       {topicData.methods.map((m, i) => (
                         <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                           <h4 style={{ color: 'var(--color-secondary)' }}>{m.name}</h4>
                           <p style={{ margin: '4px 0' }}>{m.description}</p>
                           <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                             <div><strong>Parameters:</strong> {m.parameters}</div>
                             <div><strong>Returns:</strong> {m.return_value}</div>
                             <div style={{ marginTop: '4px' }}><code>{m.example_usage}</code></div>
                           </div>
                         </div>
                       ))}
                     </div>
                   )}

                   {topicData.mistakes && topicData.mistakes.length > 0 && (
                     <div className="learning-section examples">
                       <h3>8. Common Mistakes</h3>
                       {topicData.mistakes.map((m, i) => (
                         <div key={i} style={{ marginBottom: '20px' }}>
                           <h4 style={{ color: 'var(--color-error)' }}>{m.title}</h4>
                           <p>{m.description}</p>
                           <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                             <div style={{ flex: 1 }}>
                               <strong>Wrong Example:</strong>
                               <pre style={{ borderLeft: '4px solid var(--color-error)' }}><code>{m.wrong_example}</code></pre>
                             </div>
                             <div style={{ flex: 1 }}>
                               <strong>Correct Example:</strong>
                               <pre style={{ borderLeft: '4px solid var(--color-success)' }}><code>{m.correct_example}</code></pre>
                             </div>
                           </div>
                           <p style={{ marginTop: '8px', fontSize: '0.9em', color: 'var(--text-secondary)' }}><strong>💡 Tip:</strong> {m.debugging_tip}</p>
                         </div>
                       ))}
                     </div>
                   )}

                   {topicData.interview_questions && (
                     <div className="learning-section practice">
                       <h3>9. Interview Questions</h3>
                       <div style={{ marginBottom: '16px' }}>
                         <h4>Basic Questions</h4>
                         {topicData.interview_questions.basic?.map((q, i) => (
                           <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                             <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                             <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                           </details>
                         ))}
                       </div>
                       {topicData.interview_questions.intermediate?.length > 0 && (
                         <div style={{ marginBottom: '16px' }}>
                           <h4>Intermediate Questions</h4>
                           {topicData.interview_questions.intermediate.map((q, i) => (
                             <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                               <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                               <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                             </details>
                           ))}
                         </div>
                       )}
                       {topicData.interview_questions.advanced?.length > 0 && (
                         <div>
                           <h4>Advanced Questions</h4>
                           {topicData.interview_questions.advanced.map((q, i) => (
                             <details key={i} style={{ marginBottom: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '4px' }}>
                               <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Q: {q.question}</summary>
                               <p style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-primary)' }}>A: {q.answer}</p>
                             </details>
                           ))}
                         </div>
                       )}
                     </div>
                   )}

                   {topicData.practice_questions && (
                     <div className="learning-section practice">
                       <h3>10. Practice Questions</h3>
                       <div style={{ display: 'flex', gap: '20px' }}>
                         <div style={{ flex: 1 }}>
                           <h4>Easy</h4>
                           <ul style={{ paddingLeft: '20px' }}>{topicData.practice_questions.easy?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                         </div>
                         <div style={{ flex: 1 }}>
                           <h4>Medium</h4>
                           <ul style={{ paddingLeft: '20px' }}>{topicData.practice_questions.medium?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                         </div>
                         <div style={{ flex: 1 }}>
                           <h4>Hard</h4>
                           <ul style={{ paddingLeft: '20px' }}>{topicData.practice_questions.hard?.map((q, i) => <li key={i}>{q}</li>)}</ul>
                         </div>
                       </div>
                     </div>
                   )}

                   {topicData.coding_challenges && topicData.coding_challenges.length > 0 && (
                     <div className="learning-section examples">
                       <h3>11. Coding Challenges</h3>
                       {topicData.coding_challenges.map((c, i) => (
                         <div key={i} style={{ marginBottom: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                           <h4>Challenge {i + 1}</h4>
                           <p><strong>Problem:</strong> {c.statement}</p>
                           <div style={{ display: 'flex', gap: '16px', margin: '12px 0' }}>
                             <div style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                               <strong>Input/Output Example:</strong><br />
                               Input: <code>{c.input}</code><br />
                               Output: <code>{c.output}</code>
                             </div>
                             <div style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                               <strong>Constraints:</strong><br />
                               {c.constraints}
                             </div>
                           </div>
                           <details>
                             <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View Sample Solution</summary>
                             <pre style={{ marginTop: '12px' }}><code>{c.solution}</code></pre>
                           </details>
                         </div>
                       ))}
                     </div>
                   )}

                   {topicData.real_world_applications && topicData.real_world_applications.length > 0 && (
                     <div className="learning-section theory">
                       <h3>12. Real-World Applications</h3>
                       <ul>
                         {topicData.real_world_applications.map((app, i) => (
                           <li key={i} style={{ marginBottom: '8px' }}>
                             <strong>{app.field}:</strong> {app.explanation}
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}

                   {topicData.best_practices && topicData.best_practices.length > 0 && (
                     <div className="learning-section theory">
                       <h3>13. Best Practices</h3>
                       <ul style={{ paddingLeft: '20px' }}>
                         {topicData.best_practices.map((bp, i) => (
                           <li key={i} style={{ marginBottom: '6px' }}>{bp}</li>
                         ))}
                       </ul>
                     </div>
                   )}

                   <div className="learning-section theory">
                     <h3>14. Summary</h3>
                     <ul style={{ paddingLeft: '20px' }}>
                       {topicData.summary?.map((s, i) => (
                         <li key={i} style={{ marginBottom: '6px' }}>{s}</li>
                       ))}
                     </ul>
                   </div>

                   {topicData.quiz && topicData.quiz.length > 0 && (
                     <div className="learning-section practice">
                       <h3>15. Topic Quiz</h3>
                       {topicData.quiz.map((q, i) => (
                         <div key={i} style={{ marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                           <p><strong>Q{i + 1}: {q.question}</strong></p>
                           <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: '12px 0' }}>
                             {q.options.map((opt, j) => (
                               <li key={j} style={{ padding: '8px', border: '1px solid var(--border-color)', marginBottom: '8px', borderRadius: '4px' }}>
                                 {opt}
                               </li>
                             ))}
                           </ul>
                           <details>
                             <summary style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>View Answer</summary>
                             <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,200,0,0.1)', borderRadius: '4px', borderLeft: '4px solid var(--color-success)' }}>
                               <strong>Correct Answer:</strong> {q.answer}<br /><br />
                               <strong>Explanation:</strong> {q.explanation}
                             </div>
                           </details>
                         </div>
                       ))}
                     </div>
                   )}
                 </>
               ) : (
                 <div className="learning-section theory">
                   <p>Content for <strong>{activeTopic}</strong> is currently being generated or is unavailable.</p>
                 </div>
               )}

               <div className="learning-navigation">
                 <button 
                   className="nav-btn prev-btn" 
                   onClick={handlePrevTopic}
                   disabled={PYTHON_TOPICS.indexOf(activeTopic) === 0}
                 >
                   &larr; Previous Topic
                 </button>
                 <button 
                   className="nav-btn next-btn" 
                   onClick={handleNextTopic}
                   disabled={PYTHON_TOPICS.indexOf(activeTopic) === PYTHON_TOPICS.length - 1}
                 >
                   Next Topic &rarr;
                 </button>
               </div>
             </div>
          ) : currentProjects.length === 0 ? (
            <div className="no-results">
              <p>No projects match your search criteria.</p>
              <button className="view-details-btn" style={{marginTop: '16px', maxWidth: '200px'}} onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All'); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="projects-grid">
                {currentProjects.map((proj) => (
                  <div key={proj.id} className="project-card">
                    <div className="project-image-container">
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="project-image"
                        loading="lazy"
                      />
                      <span className="project-difficulty-badge">
                        {proj.difficulty}
                      </span>
                    </div>

                    <div className="project-content">
                      <h3 className="project-title">{proj.title}</h3>
                      
                      <div className="project-tech-stack">
                        {proj.technologyStack?.slice(0, 3).map((tech) => (
                          <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                      </div>

                      <p className="project-description">{proj.shortDescription}</p>

                      <button 
                        className="view-details-btn"
                        onClick={() => viewProjectDetails(proj.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="pagination-btn" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {category === 'Python Projects' && (
          <aside className="python-learning-sidebar">
            <h3 className="sidebar-title">Python Learning Path</h3>
            <div className="topic-search">
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredTopics.map((topic) => (
                <li 
                  key={topic} 
                  className={`topic-item ${activeTopic === topic ? 'active' : ''}`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {topicProgress[topic] && (
                      <span className={`progress-badge ${topicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {topicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'Java Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">☕ Java Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={javaTopicSearchQuery}
                onChange={(e) => setJavaTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredJavaTopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeJavaTopic === topic ? 'active' : ''}`}
                  onClick={() => handleJavaTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {javaTopicProgress[topic] && (
                      <span className={`progress-badge ${javaTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {javaTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredJavaTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'VLSI Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">⚡ VLSI Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={vlsiTopicSearchQuery}
                onChange={(e) => setVlsiTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredVlsiTopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeVlsiTopic === topic ? 'active' : ''}`}
                  onClick={() => handleVlsiTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {vlsiTopicProgress[topic] && (
                      <span className={`progress-badge ${vlsiTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {vlsiTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredVlsiTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'Embedded Systems Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">⚙️ Embedded Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={embeddedTopicSearchQuery}
                onChange={(e) => setEmbeddedTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredEmbeddedTopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeEmbeddedTopic === topic ? 'active' : ''}`}
                  onClick={() => handleEmbeddedTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {embeddedTopicProgress[topic] && (
                      <span className={`progress-badge ${embeddedTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {embeddedTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredEmbeddedTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'Artificial Intelligence Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">🤖 AI Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={aiTopicSearchQuery}
                onChange={(e) => setAiTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredAITopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeAITopic === topic ? 'active' : ''}`}
                  onClick={() => handleAITopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {aiTopicProgress[topic] && (
                      <span className={`progress-badge ${aiTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {aiTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredAITopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'Machine Learning Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">🧠 ML Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={mlTopicSearchQuery}
                onChange={(e) => setMlTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredMLTopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeMLTopic === topic ? 'active' : ''}`}
                  onClick={() => handleMLTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {mlTopicProgress[topic] && (
                      <span className={`progress-badge ${mlTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {mlTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredMLTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}

        {category === 'Cloud Computing Projects' && (
          <aside className="java-learning-sidebar">
            <h3 className="sidebar-title">☁️ Cloud Learning Path</h3>
            <div className="topic-search">
              <input
                type="text"
                placeholder="Search topics..."
                value={cloudTopicSearchQuery}
                onChange={(e) => setCloudTopicSearchQuery(e.target.value)}
              />
            </div>
            <ul className="topic-list">
              {filteredCloudTopics.map((topic) => (
                <li
                  key={topic}
                  className={`topic-item ${activeCloudTopic === topic ? 'active' : ''}`}
                  onClick={() => handleCloudTopicClick(topic)}
                >
                  <div className="topic-item-header">
                    <span className="topic-name">{topic}</span>
                    {cloudTopicProgress[topic] && (
                      <span className={`progress-badge ${cloudTopicProgress[topic].replace(' ', '-').toLowerCase()}`}>
                        {cloudTopicProgress[topic]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {filteredCloudTopics.length === 0 && (
                <li className="no-topics-found">No topics found.</li>
              )}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
};
