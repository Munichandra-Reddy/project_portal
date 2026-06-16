const fs = require('fs');
const path = require('path');

const JAVA_TOPICS = [
  "Introduction to Java",
  "Java Installation & Setup",
  "Java Program Structure",
  "Variables",
  "Data Types",
  "Operators",
  "Input & Output",
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

const dir = path.join('d:', 'Geonixa Platform', 'frontend', 'public', 'data', 'java-topics');
const fallbackPath = path.join(dir, 'Fallback.json');

try {
  const fallbackData = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));
  
  JAVA_TOPICS.forEach(topic => {
    const file = path.join(dir, `${topic}.json`);
    if (!fs.existsSync(file)) {
      console.log(`Generating missing file for: ${topic}`);
      // Create a deep copy of fallback
      const newTopicData = JSON.parse(JSON.stringify(fallbackData));
      newTopicData.title = topic;
      newTopicData.introduction.what_it_is = `This is a comprehensive educational module for ${topic}. The detailed content for this topic is currently being enhanced and will be fully available soon.`;
      
      fs.writeFileSync(file, JSON.stringify(newTopicData, null, 2), 'utf-8');
      console.log(`Created ${file}`);
    } else {
      console.log(`Topic already exists: ${topic}`);
    }
  });
  
  console.log("All missing topics generated successfully.");
} catch (err) {
  console.error("Error generating files:", err);
}
