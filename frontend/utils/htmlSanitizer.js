/**
 * Utility to parse and sanitize raw LeetCode HTML content.
 */

function decodeHTMLEntities(text) {
  const entities = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '<sup>': '^',
    '</sup>': '',
    '<sub>': '_',
    '</sub>': ''
  };
  return text.replace(/&[#\w]+;|<\/?(?:sup|sub)>/g, match => entities[match] || match);
}

function stripHTML(html) {
  if (!html) return '';
  
  // Replace block elements with newlines to preserve structure
  let text = html
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<pre[^>]*>/gi, '\n')
    .replace(/<\/pre>/gi, '\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<div[^>]*>/gi, '\n')
    .replace(/<\/div>/gi, '\n');

  // Strip all remaining tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Decode entities
  text = decodeHTMLEntities(text);

  // Normalize multiple newlines and spaces
  text = text.replace(/\n\s*\n/g, '\n\n').trim();
  
  return text;
}

export function parseAndCleanLeetCodeContent(htmlString) {
  if (!htmlString) return { description: '', examples: [], constraints: [] };

  // First, let's extract sections using regex on the raw HTML
  // Examples usually start with <strong class="example">Example ...</strong> or just <strong>Example ...</strong>
  // Constraints usually start with <strong>Constraints:</strong>
  
  let descriptionPart = htmlString;
  let examplesPart = '';
  let constraintsPart = '';

  const constraintsMatch = htmlString.match(/(<p>)?<strong>Constraints:<\/strong>(<\/p>)?[\s\S]*/i);
  if (constraintsMatch) {
    constraintsPart = constraintsMatch[0];
    descriptionPart = htmlString.substring(0, constraintsMatch.index);
  }

  // Example match
  const exampleMatch = descriptionPart.match(/(<p>)?(<strong[^>]*>)?Example 1:?(<\/strong>)?(<\/p>)?[\s\S]*/i);
  if (exampleMatch) {
    examplesPart = exampleMatch[0];
    descriptionPart = descriptionPart.substring(0, exampleMatch.index);
  }

  // Clean description
  const cleanDescription = stripHTML(descriptionPart);

  // Parse examples
  const parsedExamples = [];
  if (examplesPart) {
    // Split by "Example N:"
    const exampleBlocks = examplesPart.split(/(?:<p>)?(?:<strong[^>]*>)?Example \d+:?(?:<\/strong>)?(?:<\/p>)?/i).filter(Boolean);
    const seenExamples = new Set();

    for (let block of exampleBlocks) {
      const cleanBlock = stripHTML(block);
      if (!cleanBlock || seenExamples.has(cleanBlock)) continue;
      
      seenExamples.add(cleanBlock);
      
      // Try to parse Input, Output, Explanation
      const inputMatch = cleanBlock.match(/Input:\s*(.*?)\n/i);
      const outputMatch = cleanBlock.match(/Output:\s*(.*?)(?:\n|$)/i);
      const explanationMatch = cleanBlock.match(/Explanation:\s*([\s\S]*)/i);

      parsedExamples.push({
        input: inputMatch ? inputMatch[1].trim() : '',
        output: outputMatch ? outputMatch[1].trim() : '',
        explanation: explanationMatch ? explanationMatch[1].trim() : ''
      });
    }
  }

  // Parse constraints
  const parsedConstraints = [];
  if (constraintsPart) {
    // Remove the "Constraints:" header
    const cleanConstraintsBlock = stripHTML(constraintsPart).replace(/^Constraints:\s*/i, '');
    const lines = cleanConstraintsBlock.split('\n').filter(Boolean);
    const seenConstraints = new Set();
    
    for (let line of lines) {
      const cleanLine = line.replace(/^- /, '').trim();
      if (!cleanLine || seenConstraints.has(cleanLine)) continue;
      seenConstraints.add(cleanLine);
      parsedConstraints.push(cleanLine);
    }
  }

  return {
    description: cleanDescription,
    examples: parsedExamples,
    constraints: parsedConstraints
  };
}
