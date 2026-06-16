import { runLocalCode } from '../compiler/localRunner.js';

const testJS = async () => {
  console.log("-----------------------------------------");
  console.log("🧪 Testing Local JavaScript Compiler...");
  console.log("-----------------------------------------");

  const jsCode = `
function twoSum(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (diff in map) {
            return [map[diff], i];
        }
        map[nums[i]] = i;
    }
    return [];
}
`;
  
  const testInput = "[2,7,11,15]\n9";
  const expected = "[0,1]";
  
  try {
    const result = await runLocalCode('javascript', jsCode, 'twoSum', 2, testInput, expected);
    console.log("Status:", result.status);
    console.log("Stdout:", result.stdout);
    console.log("Stderr:", result.stderr);
    console.log("Elapsed:", result.time, "ms");
    
    if (result.status === 'Accepted' && result.stdout.trim() === expected) {
      console.log("✅ JS COMPILER TEST PASSED!");
    } else {
      console.error("❌ JS COMPILER TEST FAILED! Expected stdout:", expected, "got:", result.stdout);
    }
  } catch (error) {
    console.error("❌ JS Test crashed:", error);
  }
};

const testPython = async () => {
  console.log("\n-----------------------------------------");
  console.log("🧪 Testing Local Python Compiler...");
  console.log("-----------------------------------------");

  const pyCode = `
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`;

  const testInput = "[2,7,11,15]\n9";
  const expected = "[0, 1]"; // Note the space in python list output json serialization

  try {
    const result = await runLocalCode('python', pyCode, 'twoSum', 2, testInput, expected);
    console.log("Status:", result.status);
    console.log("Stdout:", result.stdout);
    console.log("Stderr:", result.stderr);
    console.log("Elapsed:", result.time, "ms");

    // Standardize spaces to compare outputs
    const compress = (str) => str.replace(/\s+/g, '');
    const passed = result.status === 'Accepted' && compress(result.stdout) === compress(expected);

    if (passed) {
      console.log("✅ PYTHON COMPILER TEST PASSED!");
    } else {
      console.error("❌ PYTHON COMPILER TEST FAILED! Expected stdout:", expected, "got:", result.stdout);
    }
  } catch (error) {
    console.error("❌ Python Test crashed:", error);
  }
};

const runAllTests = async () => {
  await testJS();
  await testPython();
  process.exit(0);
};

runAllTests();
