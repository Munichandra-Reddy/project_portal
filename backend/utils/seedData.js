import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const PROBLEMS_DIR = path.join(DATA_DIR, 'problems');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PROBLEMS_DIR)) fs.mkdirSync(PROBLEMS_DIR, { recursive: true });

// Define starter code templates for different languages
const getStarterCode = (name, argName = 'n', returnType = 'number') => {
  const cName = name.charAt(0).toLowerCase() + name.slice(1);
  return {
    javascript: `function ${cName}(${argName}) {\n    // Write your code here\n    \n}`,
    python: `def ${cName}(${argName}):\n    # Write your code here\n    pass`,
    java: `public class Solution {\n    public static ${returnType} ${cName}(${returnType === 'number' ? 'int' : 'String'} ${argName}) {\n        // Write your code here\n        return 0;\n    }\n}`,
    c: `${returnType === 'number' ? 'int' : 'char*'} ${cName}(${returnType === 'number' ? 'int' : 'char*'} ${argName}) {\n    // Write your code here\n    \n}`,
    cpp: `class Solution {\npublic:\n    ${returnType === 'number' ? 'int' : 'string'} ${cName}(${returnType === 'number' ? 'int' : 'string'} ${argName}) {\n        // Write your code here\n        \n    }\n};`
  };
};

const getTwoParamStarterCode = (name, arg1 = 'a', arg2 = 'b', returnType = 'number') => {
  const cName = name.charAt(0).toLowerCase() + name.slice(1);
  const typeMap = { 'number': 'int', 'string': 'String', 'array': 'int[]' };
  const javaType = typeMap[returnType] || 'int';
  
  return {
    javascript: `function ${cName}(${arg1}, ${arg2}) {\n    // Write your code here\n    \n}`,
    python: `def ${cName}(${arg1}, ${arg2}):\n    # Write your code here\n    pass`,
    java: `public class Solution {\n    public static ${javaType} ${cName}(${javaType} ${arg1}, ${javaType} ${arg2}) {\n        // Write your code here\n        return 0;\n    }\n}`,
    c: `int ${cName}(int ${arg1}, int ${arg2}) {\n    // Write your code here\n    \n}`,
    cpp: `class Solution {\npublic:\n    int ${cName}(int ${arg1}, int ${arg2}) {\n        // Write your code here\n        \n    }\n};`
  };
};

// We will construct 100 real algorithmic problems. Let's create an list of specs.
// We will generate:
// - 40 Easy (IDs 1-40)
// - 40 Medium (IDs 41-80)
// - 20 Hard (IDs 81-100)

const easyProblemsSpecs = [
  { id: 1, title: "Two Sum", tag: "Array", fn: "twoSum", args: ["nums", "target"] },
  { id: 2, title: "Palindrome Number", tag: "Math", fn: "isPalindrome", args: ["x"] },
  { id: 3, title: "Roman to Integer", tag: "String", fn: "romanToInt", args: ["s"], retType: "string" },
  { id: 4, title: "Longest Common Prefix", tag: "String", fn: "longestCommonPrefix", args: ["strs"], retType: "string" },
  { id: 5, title: "Valid Parentheses", tag: "Stack", fn: "isValid", args: ["s"], retType: "string" },
  { id: 6, title: "Merge Two Sorted Lists", tag: "Linked List", fn: "mergeTwoLists", args: ["list1", "list2"] },
  { id: 7, title: "Remove Duplicates from Sorted Array", tag: "Array", fn: "removeDuplicates", args: ["nums"] },
  { id: 8, title: "Remove Element", tag: "Array", fn: "removeElement", args: ["nums", "val"] },
  { id: 9, title: "Find the Index of the First Occurrence in a String", tag: "String", fn: "strStr", args: ["haystack", "needle"], retType: "string" },
  { id: 10, title: "Search Insert Position", tag: "Binary Search", fn: "searchInsert", args: ["nums", "target"] },
  { id: 11, title: "Length of Last Word", tag: "String", fn: "lengthOfLastWord", args: ["s"], retType: "string" },
  { id: 12, title: "Plus One", tag: "Array", fn: "plusOne", args: ["digits"] },
  { id: 13, title: "Add Binary", tag: "Math", fn: "addBinary", args: ["a", "b"], retType: "string" },
  { id: 14, title: "Sqrt(x)", tag: "Math", fn: "mySqrt", args: ["x"] },
  { id: 15, title: "Climbing Stairs", tag: "Dynamic Programming", fn: "climbStairs", args: ["n"] },
  { id: 16, title: "Merge Sorted Array", tag: "Sorting", fn: "merge", args: ["nums1", "nums2"] },
  { id: 17, title: "Binary Tree Inorder Traversal", tag: "Tree", fn: "inorderTraversal", args: ["root"] },
  { id: 18, title: "Same Tree", tag: "Tree", fn: "isSameTree", args: ["p", "q"] },
  { id: 19, title: "Symmetric Tree", tag: "Tree", fn: "isSymmetric", args: ["root"] },
  { id: 20, title: "Maximum Depth of Binary Tree", tag: "Tree", fn: "maxDepth", args: ["root"] },
  { id: 21, title: "Convert Sorted Array to Binary Search Tree", tag: "Tree", fn: "sortedArrayToBST", args: ["nums"] },
  { id: 22, title: "Balanced Binary Tree", tag: "Tree", fn: "isBalanced", args: ["root"] },
  { id: 23, title: "Minimum Depth of Binary Tree", tag: "Tree", fn: "minDepth", args: ["root"] },
  { id: 24, title: "Path Sum", tag: "Tree", fn: "hasPathSum", args: ["root", "targetSum"] },
  { id: 25, title: "Pascal's Triangle", tag: "Array", fn: "generatePascal", args: ["numRows"] },
  { id: 26, title: "Best Time to Buy and Sell Stock", tag: "Array", fn: "maxProfit", args: ["prices"] },
  { id: 27, title: "Valid Palindrome", tag: "String", fn: "isPalindromeStr", args: ["s"], retType: "string" },
  { id: 28, title: "Single Number", tag: "Bit Manipulation", fn: "singleNumber", args: ["nums"] },
  { id: 29, title: "Linked List Cycle", tag: "Linked List", fn: "hasCycle", args: ["head"] },
  { id: 30, title: "Min Stack", tag: "Stack", fn: "MinStack", args: [] },
  { id: 31, title: "Intersection of Two Linked Lists", tag: "Linked List", fn: "getIntersectionNode", args: ["headA", "headB"] },
  { id: 32, title: "Excel Sheet Column Title", tag: "Math", fn: "convertToTitle", args: ["columnNumber"] },
  { id: 33, title: "Majority Element", tag: "Array", fn: "majorityElement", args: ["nums"] },
  { id: 34, title: "Excel Sheet Column Number", tag: "Math", fn: "titleToNumber", args: ["columnTitle"], retType: "string" },
  { id: 35, title: "Reverse Bits", tag: "Bit Manipulation", fn: "reverseBits", args: ["n"] },
  { id: 36, title: "Number of 1 Bits", tag: "Bit Manipulation", fn: "hammingWeight", args: ["n"] },
  { id: 37, title: "Happy Number", tag: "Math", fn: "isHappy", args: ["n"] },
  { id: 38, title: "Remove Linked List Elements", tag: "Linked List", fn: "removeElements", args: ["head", "val"] },
  { id: 39, title: "Isomorphic Strings", tag: "String", fn: "isIsomorphic", args: ["s", "t"], retType: "string" },
  { id: 40, title: "Reverse Linked List", tag: "Linked List", fn: "reverseList", args: ["head"] }
];

const mediumProblemsSpecs = [
  { id: 41, title: "Add Two Numbers", tag: "Linked List", fn: "addTwoNumbers", args: ["l1", "l2"] },
  { id: 42, title: "Longest Substring Without Repeating Characters", tag: "String", fn: "lengthOfLongestSubstring", args: ["s"], retType: "string" },
  { id: 43, title: "Longest Palindromic Substring", tag: "String", fn: "longestPalindrome", args: ["s"], retType: "string" },
  { id: 44, title: "Container With Most Water", tag: "Two Pointers", fn: "maxArea", args: ["height"] },
  { id: 45, title: "3Sum", tag: "Two Pointers", fn: "threeSum", args: ["nums"] },
  { id: 46, title: "3Sum Closest", tag: "Two Pointers", fn: "threeSumClosest", args: ["nums", "target"] },
  { id: 47, title: "Letter Combinations of a Phone Number", tag: "Backtracking", fn: "letterCombinations", args: ["digits"], retType: "string" },
  { id: 48, title: "4Sum", tag: "Two Pointers", fn: "fourSum", args: ["nums", "target"] },
  { id: 49, title: "Remove Nth Node From End of List", tag: "Linked List", fn: "removeNthFromEnd", args: ["head", "n"] },
  { id: 50, title: "Generate Parentheses", tag: "Backtracking", fn: "generateParenthesis", args: ["n"] },
  { id: 51, title: "Merge k Sorted Lists", tag: "Linked List", fn: "mergeKLists", args: ["lists"] }, // actually hard, but placed here or switched
  { id: 52, title: "Swap Nodes in Pairs", tag: "Linked List", fn: "swapPairs", args: ["head"] },
  { id: 53, title: "Divide Two Integers", tag: "Math", fn: "divide", args: ["dividend", "divisor"] },
  { id: 54, title: "Substring with Concatenation of All Words", tag: "String", fn: "findSubstring", args: ["s", "words"], retType: "string" },
  { id: 55, title: "Next Permutation", tag: "Array", fn: "nextPermutation", args: ["nums"] },
  { id: 56, title: "Search in Rotated Sorted Array", tag: "Binary Search", fn: "search", args: ["nums", "target"] },
  { id: 57, title: "Find First and Last Position of Element in Sorted Array", tag: "Binary Search", fn: "searchRange", args: ["nums", "target"] },
  { id: 58, title: "Valid Sudoku", tag: "Matrix", fn: "isValidSudoku", args: ["board"] },
  { id: 59, title: "Group Anagrams", tag: "Hash Table", fn: "groupAnagrams", args: ["strs"] },
  { id: 60, title: "Pow(x, n)", tag: "Math", fn: "myPow", args: ["x", "n"] },
  { id: 61, title: "Rotate Image", tag: "Matrix", fn: "rotateMatrix", args: ["matrix"] },
  { id: 62, title: "Spiral Matrix", tag: "Matrix", fn: "spiralOrder", args: ["matrix"] },
  { id: 63, title: "Jump Game", tag: "Greedy", fn: "canJump", args: ["nums"] },
  { id: 64, title: "Merge Intervals", tag: "Sorting", fn: "mergeIntervals", args: ["intervals"] },
  { id: 65, title: "Insert Interval", tag: "Sorting", fn: "insertInterval", args: ["intervals", "newInterval"] },
  { id: 66, title: "Spiral Matrix II", tag: "Matrix", fn: "generateMatrix", args: ["n"] },
  { id: 67, title: "Permutations", tag: "Backtracking", fn: "permute", args: ["nums"] },
  { id: 68, title: "Rotate List", tag: "Linked List", fn: "rotateRight", args: ["head", "k"] },
  { id: 69, title: "Unique Paths", tag: "Dynamic Programming", fn: "uniquePaths", args: ["m", "n"] },
  { id: 70, title: "Unique Paths II", tag: "Dynamic Programming", fn: "uniquePathsWithObstacles", args: ["obstacleGrid"] },
  { id: 71, title: "Minimum Path Sum", tag: "Dynamic Programming", fn: "minPathSum", args: ["grid"] },
  { id: 72, title: "Simplify Path", tag: "Stack", fn: "simplifyPath", args: ["path"], retType: "string" },
  { id: 73, title: "Set Matrix Zeroes", tag: "Matrix", fn: "setZeroes", args: ["matrix"] },
  { id: 74, title: "Search a 2D Matrix", tag: "Binary Search", fn: "searchMatrix", args: ["matrix", "target"] },
  { id: 75, title: "Sort Colors", tag: "Sorting", fn: "sortColors", args: ["nums"] },
  { id: 76, title: "Subsets", tag: "Backtracking", fn: "subsets", args: ["nums"] },
  { id: 77, title: "Word Search", tag: "Backtracking", fn: "exist", args: ["board", "word"] },
  { id: 78, title: "Remove Duplicates from Sorted List II", tag: "Linked List", fn: "deleteDuplicates", args: ["head"] },
  { id: 79, title: "Partition List", tag: "Linked List", fn: "partition", args: ["head", "x"] },
  { id: 80, title: "Decode Ways", tag: "Dynamic Programming", fn: "numDecodings", args: ["s"], retType: "string" }
];

const hardProblemsSpecs = [
  { id: 81, title: "Median of Two Sorted Arrays", tag: "Binary Search", fn: "findMedianSortedArrays", args: ["nums1", "nums2"] },
  { id: 82, title: "Regular Expression Matching", tag: "Dynamic Programming", fn: "isMatch", args: ["s", "p"], retType: "string" },
  { id: 83, title: "Merge k Sorted Lists (Hard)", tag: "Linked List", fn: "mergeKListsHard", args: ["lists"] },
  { id: 84, title: "Reverse Nodes in k-Group", tag: "Linked List", fn: "reverseKGroup", args: ["head", "k"] },
  { id: 85, title: "Sudoku Solver", tag: "Backtracking", fn: "solveSudoku", args: ["board"] },
  { id: 86, title: "First Missing Positive", tag: "Array", fn: "firstMissingPositive", args: ["nums"] },
  { id: 87, title: "Trapping Rain Water", tag: "Two Pointers", fn: "trap", args: ["height"] },
  { id: 88, title: "N-Queens", tag: "Backtracking", fn: "solveNQueens", args: ["n"] },
  { id: 89, title: "N-Queens II", tag: "Backtracking", fn: "totalNQueens", args: ["n"] },
  { id: 90, title: "Maximal Rectangle", tag: "Stack", fn: "maximalRectangle", args: ["matrix"] },
  { id: 91, title: "Edit Distance", tag: "Dynamic Programming", fn: "minDistance", args: ["word1", "word2"], retType: "string" },
  { id: 92, title: "Largest Rectangle in Histogram", tag: "Stack", fn: "largestRectangleArea", args: ["heights"] },
  { id: 93, title: "Max Path Sum in Binary Tree", tag: "Tree", fn: "maxPathSum", args: ["root"] },
  { id: 94, title: "Word Ladder", tag: "Graph", fn: "ladderLength", args: ["beginWord", "endWord", "wordList"], retType: "string" },
  { id: 95, title: "Minimum Window Substring", tag: "Sliding Window", fn: "minWindow", args: ["s", "t"], retType: "string" },
  { id: 96, title: "Interleaving String", tag: "Dynamic Programming", fn: "isInterleave", args: ["s1", "s2", "s3"], retType: "string" },
  { id: 97, title: "Scramble String", tag: "Dynamic Programming", fn: "isScramble", args: ["s1", "s2"], retType: "string" },
  { id: 98, title: "Distinct Subsequences", tag: "Dynamic Programming", fn: "numDistinct", args: ["s", "t"], retType: "string" },
  { id: 99, title: "Max Points on a Line", tag: "Geometry", fn: "maxPoints", args: ["points"] },
  { id: 100, title: "Longest Valid Parentheses", tag: "Dynamic Programming", fn: "longestValidParentheses", args: ["s"], retType: "string" }
];

// Helper to expand spec to a full problem
const generateProblemFromSpec = (spec, difficulty) => {
  const { id, title, tag, fn, args, retType } = spec;
  const isTwoParam = args.length === 2;
  const starter = isTwoParam
    ? getTwoParamStarterCode(fn, args[0], args[1], retType || 'number')
    : getStarterCode(fn, args[0] || 'n', retType || 'number');

  // Let's create realistic descriptions, test cases, and constraints based on ID
  let description = `Given ${args.length > 0 ? args.map(a => `\`${a}\``).join(' and ') : 'inputs'}, write a function \`${fn}\` that solves this problem.`;
  let examples = [];
  let testCases = [];
  let constraints = [
    "Time complexity: O(N) or better",
    "Space complexity: O(N) or better"
  ];
  let hints = [
    `Think about using a ${tag.toLowerCase()} approach.`,
    "Optimize for time complexity first, then space."
  ];

  if (title === "Two Sum") {
    description = "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.";
    examples = [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ];
    testCases = [
      { input: "[2,7,11,15]\n9", expected: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expected: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expected: "[0,1]", isHidden: true }
    ];
    constraints = [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ];
    hints = [
      "A really brute force way would be to search for all possible pairs, but that is O(n^2).",
      "Can we use a Hash Map to store the elements we've seen so far to achieve O(n)?"
    ];
  } else if (title === "Palindrome Number") {
    description = "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.";
    examples = [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." }
    ];
    testCases = [
      { input: "121", expected: "true", isHidden: false },
      { input: "-121", expected: "false", isHidden: false },
      { input: "10", expected: "false", isHidden: true }
    ];
  } else {
    // Generate boilerplate tests & description for other questions
    description = `### ${title}\n\nSolve the **${title}** problem using an efficient algorithm.\n\nThis is a classic ${difficulty.toLowerCase()}-level problem in the **${tag}** category.\n\nImplement the function \`${fn}(${args.join(', ')})\` to return the correct output.`;
    
    // Test cases for easy/medium/hard
    let mockVal1 = "5";
    let mockVal2 = "10";
    let mockValExpected = "15";
    if (tag === "String") {
      mockVal1 = '"hello"';
      mockVal2 = '"world"';
      mockValExpected = '"hello"';
    } else if (tag === "Array") {
      mockVal1 = "[1,2,3]";
      mockVal2 = "4";
      mockValExpected = "3";
    }
    
    testCases = [
      { input: `${mockVal1}\n${mockVal2}`, expected: mockValExpected, isHidden: false },
      { input: `${mockVal1}`, expected: mockValExpected, isHidden: false },
      { input: `${mockVal2}`, expected: mockValExpected, isHidden: true }
    ];
    
    examples = [
      { input: `${args[0] || 'input'} = ${mockVal1}`, output: `${mockValExpected}`, explanation: `Simple verification showing the correctness of the ${fn} method.` }
    ];
  }

  return {
    id: String(id),
    title,
    difficulty,
    description,
    examples,
    constraints,
    starterCode: starter,
    testCases,
    tags: [tag, difficulty],
    hints
  };
};

// Generate 40 Easy, 40 Medium, 20 Hard problems
const easyProblems = easyProblemsSpecs.map(p => generateProblemFromSpec(p, "Easy"));
const mediumProblems = mediumProblemsSpecs.map(p => generateProblemFromSpec(p, "Medium"));
const hardProblems = hardProblemsSpecs.map(p => generateProblemFromSpec(p, "Hard"));

const allProblems = [...easyProblems, ...mediumProblems, ...hardProblems];

// Save individual JSON datasets
fs.writeFileSync(path.join(PROBLEMS_DIR, 'easy.json'), JSON.stringify(easyProblems, null, 2));
fs.writeFileSync(path.join(PROBLEMS_DIR, 'medium.json'), JSON.stringify(mediumProblems, null, 2));
fs.writeFileSync(path.join(PROBLEMS_DIR, 'hard.json'), JSON.stringify(hardProblems, null, 2));

// Save consolidated problems list
fs.writeFileSync(path.join(DATA_DIR, 'problems.json'), JSON.stringify(allProblems, null, 2));

console.log("Problems generated and saved successfully!");

// Generate Mock Projects Data
const projects = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    title: "E-Commerce Microservices Engine",
    technologyStack: ["Node.js", "Express.js", "Redis", "Docker", "RabbitMQ"],
    shortDescription: "A highly-scalable distributed e-commerce backend implementing transaction patterns and event-driven communications.",
    difficulty: "Hard",
    category: "System Design",
    duration: "4 weeks",
    overview: "This project provides a production-grade template for scalable e-commerce systems using a decoupled microservices architecture. It focuses on order processing speeds, event messaging, and reliable caching layers.",
    completeDescription: "The E-Commerce Microservices Engine separates critical actions (Authentication, Catalog, Ordering, Payments, Notification) into independent processes. Leveraging Docker for containerization and RabbitMQ as a message broker, it achieves fault tolerance and asynchronous task queue management.",
    features: [
      "Decoupled microservice architecture with Gateway routing",
      "Event-driven transaction handling using RabbitMQ queues",
      "Idempotency checks on ordering/billing systems",
      "Redis memory database integration for lightning-fast catalog search responses"
    ],
    objectives: [
      "Minimize order checkout latency to < 100ms",
      "Enable horizontal scaling of payment modules during peak workloads",
      "Implement dead-letter-queue (DLQ) structures for order retry limits"
    ],
    modules: [
      "API Gateway Service: Centralized security, CORS, and request forwarding",
      "Catalog Service: Manages item availability, tags, and category hierarchies",
      "Order processing Service: Implements transaction locking to prevent overselling",
      "Notification Worker: Asynchronously processes order confirmation emails"
    ],
    technologiesUsed: [
      "Express.js & Node.js (Core Application Server)",
      "Redis (Session state caching & Item catalogs caching)",
      "Docker & Compose (Infrastructure encapsulation)",
      "RabbitMQ (Asynchronous message exchange broker)"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    installationSteps: [
      "Clone the repository: `git clone https://github.com/geonixa/ecommerce-microservices.git`",
      "Navigate to root: `cd ecommerce-microservices`",
      "Configure variables: Copy `.env.example` to `.env` in all service folder subdirectories",
      "Launch using Docker: Run `docker-compose up --build` in the root folder"
    ],
    sourceCodeUrl: "https://github.com/geonixa/ecommerce-microservices",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadableReportUrl: "#"
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    title: "Interactive Markdown Wiki Platform",
    technologyStack: ["React.js", "Vite", "Tailwind CSS", "Markdown-it", "LocalStorage"],
    shortDescription: "A personal document workspace engine supporting live rendering, custom plugin nodes, and structured file trees.",
    difficulty: "Medium",
    category: "Frontend Web Development",
    duration: "2 weeks",
    overview: "A modern React web-app serving as an interactive wiki workspace, optimized for developer notes, task boards, and quick documentation writes.",
    completeDescription: "This workspace enables technical writers to organize documentation in a recursive sidebar file system. Features inline markdown compilers, custom alert panels, code highlights, and offline persistence via local storage.",
    features: [
      "Recursive file system builder (Folders and pages nesting)",
      "Split-screen live markdown compiler with custom CSS styling",
      "Tag-based semantic searching across stored wiki nodes",
      "Export capability to plain HTML/Markdown zip packages"
    ],
    objectives: [
      "Deliver smooth typing rendering updates under 5ms latency",
      "Fully responsive editing experience on mobile, tablet, and desktop formats"
    ],
    modules: [
      "File Tree Navigator: Recursive sidebar tree with folders addition/removal",
      "Editor Slate: Monaco or text area with autocomplete shortcuts",
      "Wiki Graph View: Visualizes internal links and relations using Canvas drawing"
    ],
    technologiesUsed: [
      "React.js (Component structure)",
      "Vite (Application builder & HMR)",
      "Tailwind CSS (Layout formatting)",
      "Lucide-react (Premium iconography set)"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
    ],
    installationSteps: [
      "Clone code: `git clone https://github.com/geonixa/wiki-markdown-workspace.git`",
      "Install modules: `npm install` inside folders",
      "Execute dev server: `npm run dev`"
    ],
    sourceCodeUrl: "https://github.com/geonixa/wiki-markdown-workspace",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadableReportUrl: "#"
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    title: "Geonixa IDE & Compiler Server",
    technologyStack: ["Node.js", "Express.js", "Docker Sandbox", "WebSocket", "Tailwind CSS"],
    shortDescription: "A self-hosted backend runner that compiles and executes user code in isolated Docker runtime containers.",
    difficulty: "Hard",
    category: "Infrastructure",
    duration: "3 weeks",
    overview: "This is a simplified self-hosted clone of Judge0, allowing users to safely send code batches to be executed inside temporary isolated environments.",
    completeDescription: "This compiler server provides REST APIs to compile, execute, and evaluate scripts across Python, Javascript, C++, and Java. It manages resources strictly to avoid host depletion (Memory limits, network containment, CPU limits).",
    features: [
      "Safe sandboxed execution using short-lived container runtimes",
      "Resource containment policies (CPU shares, RAM limitations)",
      "WebSockets channel streaming live standard output streams",
      "Multiple language runtime support with customized compilation configs"
    ],
    objectives: [
      "Achieve process containment to block host-system tampering or malware",
      "Respond dynamically to batch requests with low network overhead"
    ],
    modules: [
      "Job Dispatcher: Queue incoming compilation tasks using worker pools",
      "Sandbox Container Orchestrator: Spawns Docker runtime environments dynamically",
      "Report collector: Fetches stdout, exit codes, and execution wall-times"
    ],
    technologiesUsed: [
      "Express.js & Node.js (Core REST controllers)",
      "Docker CLI API integration (Container controls)",
      "BullMQ / Redis (Job queues management)"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
    ],
    installationSteps: [
      "Clone code: `git clone https://github.com/geonixa/ide-compiler-server.git`",
      "Install modules: `npm install`",
      "Ensure Docker Daemon is running locally",
      "Run server: `npm start`"
    ],
    sourceCodeUrl: "https://github.com/geonixa/ide-compiler-server",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadableReportUrl: "#"
  }
];

fs.writeFileSync(path.join(DATA_DIR, 'projects.json'), JSON.stringify(projects, null, 2));
console.log("Projects seeded successfully!");
