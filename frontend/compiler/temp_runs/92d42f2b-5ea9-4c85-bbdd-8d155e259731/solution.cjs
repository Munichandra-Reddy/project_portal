
function easyProblem131(nums) {
    // Write your code here
    
}

const fs = require('fs');
try {
  const inputData = fs.readFileSync(0, 'utf-8').trim();
  if (!inputData) {
    console.log(JSON.stringify(solution()));
    process.exit(0);
  }
  
  const lines = inputData.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const parsedArgs = [];
  
  for (let i = 0; i < Math.min(lines.length, 1); i++) {
    try {
      parsedArgs.push(JSON.parse(lines[i]));
    } catch (e) {
      // Fallback for non-JSON strings
      parsedArgs.push(lines[i]);
    }
  }
  
  // Call the function
  const result = solution(...parsedArgs);
  console.log(JSON.stringify(result));
} catch (err) {
  console.error("RUNTIME_ERROR: " + err.message);
  process.exit(1);
}
