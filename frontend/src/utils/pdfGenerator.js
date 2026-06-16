import { jsPDF } from "jspdf";

export const generateProjectPDF = (project) => {
  const doc = new jsPDF();
  let y = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = 170;
  
  const addText = (text, fontSize = 12, isBold = false, color = [0, 0, 0]) => {
    if (!text) return;
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    
    const lines = doc.splitTextToSize(String(text), contentWidth);
    
    for (let i = 0; i < lines.length; i++) {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines[i], margin, y);
      y += (fontSize * 0.35) + 2; 
    }
    y += 2; 
  };

  const addSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return;
    
    if (y > margin) y += 4;
    
    addText(title, 14, true, [41, 128, 185]);
    
    if (Array.isArray(content)) {
      content.forEach(item => {
        addText(`• ${item}`, 11, false, [50, 50, 50]);
      });
    } else {
      addText(content, 11, false, [50, 50, 50]);
    }
  };

  addText(project.title, 18, true, [0, 0, 0]);
  y += 5;

  addSection("Domain/Category", project.category || "General");

  const techStack = project.technologiesUsed || (project.technologyStack ? project.technologyStack.join(', ') : "Not specified");
  addSection("Technology Stack", techStack);

  addSection("Abstract", project.abstract || project.overview || "No abstract available.");

  addSection("Problem Statement", project.overview || "Addresses key challenges in the domain and provides a comprehensive solution.");

  addSection("Objectives", project.objectives || ["Implement a robust solution", "Evaluate system performance"]);

  addSection("Modules", project.modules || ["Core Module", "User Interface"]);

  addSection("Methodology", project.completeDescription || "Follows a standard software development life cycle.");

  addSection("Expected Output", project.features || ["Fully functional system meeting all requirements."]);

  addSection("Learning Outcomes", project.learningOutcomes || ["Understand core concepts", "Apply theoretical knowledge"]);

  addSection("Conclusion", "This project demonstrates the effective application of the selected technologies to solve the identified problem, providing a solid foundation for future enhancements.");

  const filename = `${project.title.replace(/[^a-zA-Z0-9]/g, '_')}_Abstract.pdf`;
  doc.save(filename);
};
