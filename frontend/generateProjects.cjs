const fs = require('fs');
const path = require('path');

const categories = [
  "Final Year Projects",
  "Embedded Systems Projects",
  "VLSI Projects",
  "IoT Projects",
  "Machine Learning Projects",
  "Artificial Intelligence Projects",
  "Python Projects",
  "Java Projects",
  "Web Development Projects",
  "Mobile App Projects",
  "Cyber Security Projects",
  "Cloud Computing Projects",
  "Data Science Projects"
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

const baseTitles = {
  "Final Year Projects": ["Automated University Management System", "Smart Library System", "E-Voting System using Blockchain", "Student Attendance System", "Hostel Management System"],
  "Embedded Systems Projects": ["Smart Home Automation System", "Smart Irrigation System", "RFID Attendance System", "Automatic Street Light Controller", "Vehicle Tracking System", "Industrial Monitoring System", "Smart Energy Meter", "Home Security System", "Fire Detection System", "Smart Parking System"],
  "VLSI Projects": ["32-bit ALU Design", "RISC Processor Design", "FIR Filter Design", "UART Controller Design", "Memory Controller Design", "Traffic Light Controller using Verilog", "SPI Protocol Implementation", "Pipelined Processor Design", "Low Power VLSI Design", "Digital Clock using Verilog"],
  "IoT Projects": ["IoT Weather Station", "Smart Agriculture using IoT", "IoT based Health Monitoring", "IoT Smart Garage Door", "IoT Air Pollution Monitor"],
  "Machine Learning Projects": ["House Price Prediction", "Customer Segmentation", "Stock Market Predictor", "Spam Email Classifier", "Disease Outbreak Prediction"],
  "Artificial Intelligence Projects": ["AI Chatbot for Healthcare", "Facial Recognition System", "Autonomous Driving Sim", "AI Chess Engine", "Gesture Recognition"],
  "Python Projects": ["Web Scraper for E-commerce", "Python Django Blog", "Automated Email Sender", "Python Discord Bot", "GUI Calculator using Tkinter"],
  "Java Projects": ["Java Airline Reservation System", "Hospital Management in Java", "Java ATM Simulator", "Java Inventory Management", "Online Examination System Java"],
  "Web Development Projects": ["E-Commerce Web App", "Social Media Dashboard", "Portfolio Website", "Task Management App", "Real-time Chat Application"],
  "Mobile App Projects": ["Fitness Tracking App", "Recipe Organizer App", "Expense Tracker Mobile", "Location based Alarm", "Language Learning App"],
  "Cyber Security Projects": ["Network Intrusion Detection System", "Secure Password Manager", "Malware Analysis Sandbox", "Phishing Website Detector", "Keylogger and Prevention"],
  "Cloud Computing Projects": ["Cloud Based File Storage", "Serverless Image Processing", "Cloud Based ERP", "Dockerized Web App on AWS", "Multi-Tenant SaaS Application"],
  "Data Science Projects": ["Credit Card Fraud Detection", "Retail Sales Analytics", "Movie Recommendation Engine", "Sentiment Analysis of Tweets", "Customer Churn Prediction"]
};

const allTechs = ["React", "Node.js", "Python", "Java", "Verilog", "VHDL", "C++", "C", "Arduino", "Raspberry Pi", "TensorFlow", "Scikit-Learn", "Django", "Spring Boot", "AWS", "Docker", "MongoDB", "MySQL"];

const projects = [];
let idCounter = 1;

categories.forEach(cat => {
  const titles = baseTitles[cat] || ["Generic Project"];
  // Generate roughly 77 projects per category to get ~1000 total (13 * 77 = 1001)
  for (let i = 0; i < 77; i++) {
    const titleBase = titles[i % titles.length];
    const uniqueTitle = `${titleBase} Version ${Math.floor(i / titles.length) + 1}.0`;
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    // Pick 3 random techs
    const shuffledTechs = allTechs.sort(() => 0.5 - Math.random());
    const techStack = shuffledTechs.slice(0, 3);
    
    const baseProject = {
      id: idCounter.toString(),
      title: uniqueTitle,
      category: cat,
      difficulty: difficulty,
      technologyStack: techStack,
      technologiesUsed: techStack.join(', '),
      shortDescription: `A comprehensive project focusing on ${cat.toLowerCase()} principles, providing practical exposure to modern engineering paradigms.`,
      duration: `${Math.floor(Math.random() * 8) + 2} Weeks`,
      thumbnail: `https://picsum.photos/seed/${idCounter}/600/400`,
      banner: `https://picsum.photos/seed/${idCounter}/1200/400`,
      overview: `This project addresses the growing need for efficient solutions in the domain of ${cat.toLowerCase()}. It is designed to provide hands-on experience and a solid foundation in the core concepts.`,
      completeDescription: `The ${uniqueTitle} is an advanced implementation designed for engineering students and professionals. It covers the entire lifecycle from design to deployment. The system ensures high performance, reliability, and ease of use.`,
      features: [
        "Real-time data processing and analytics.",
        "Secure and robust system architecture.",
        "User-friendly interface and comprehensive documentation.",
        "Scalable design for future enhancements."
      ],
      objectives: [
        "To understand the core principles of the technology stack.",
        "To implement a fully functional prototype.",
        "To evaluate system performance and reliability."
      ],
      modules: [
        "Data Acquisition Module",
        "Processing Core",
        "User Interface",
        "Reporting & Analytics"
      ],
      hardwareRequirements: [
        "Minimum 8GB RAM",
        "Intel i5 or equivalent processor",
        "Development board (if applicable)"
      ],
      softwareRequirements: [
        "Windows 10/11, Linux, or macOS",
        "Required IDE and Toolchains"
      ],
      installationSteps: [
        "1. Clone the repository.",
        "2. Install required dependencies.",
        "3. Configure environment variables.",
        "4. Run the application."
      ],
      learningOutcomes: [
        "Proficiency in selected technology stack.",
        "Understanding of system design patterns.",
        "Experience with deployment and testing."
      ],
      sourceCodeUrl: "https://github.com/example/project",
      githubUrl: "https://github.com/example/project",
      repoInfo: {
        stars: Math.floor(Math.random() * 500),
        forks: Math.floor(Math.random() * 200),
        lastUpdated: "2026-06-01"
      }
    };

    if (cat === "VLSI Projects") {
      baseProject.projectCode = `VLSI-2026-${String(idCounter).padStart(3, '0')}`;
      baseProject.abstract = `The ${uniqueTitle} project focuses on addressing complex requirements in modern integrated circuit design. Utilizing state-of-the-art Electronic Design Automation (EDA) tools, this project encompasses schematic capture, simulation, and physical layout generation. By reducing the overall silicon area and power consumption, this VLSI project achieves highly optimized outcomes that represent typical real-world challenges faced by engineers today. Through rigorous timing analysis and verification methodologies, the final tape-out readiness ensures compliance with industry standard parameters.`;
      const formattedTitle = titleBase.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      baseProject.blockDiagram = `/diagrams/${formattedTitle}.svg`;
      baseProject.specifications = {
        "Project Name": uniqueTitle,
        "Technology": "CMOS 45nm / FPGA",
        "Design Tool": "Xilinx Vivado, Cadence Virtuoso, Synopsys",
        "Platform": "Windows / Linux",
        "Device": "Artix-7 FPGA / ASIC",
        "Frequency": `${Math.floor(Math.random() * 500) + 100} MHz`,
        "Area": `${Math.floor(Math.random() * 40) + 20}% of Slice LUTs`,
        "Power": `${Math.floor(Math.random() * 50) + 10} mW`,
        "Applications": "Consumer Electronics, Automotives, IoT Devices"
      };
      baseProject.pdfDownloadUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      baseProject.docDownloadUrl = "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc";
      baseProject.demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      baseProject.learningOutcomes = [
        "CMOS Design Concepts",
        "Timing Analysis",
        "Power Optimization",
        "Layout Design",
        "Verification Techniques",
        "FPGA/ASIC Implementation"
      ];
    }

    projects.push(baseProject);
    idCounter++;
  }
});

const dirPath = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(path.join(dirPath, 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`Successfully generated ${projects.length} projects.`);
