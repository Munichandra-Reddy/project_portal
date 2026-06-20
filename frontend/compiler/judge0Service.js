import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const API_KEY = process.env.JUDGE0_API_KEY || '';
const API_HOST = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';

const LANGUAGE_IDS = {
  javascript: 93, // Node.js
  js: 93,
  python: 71, // Python 3
  py: 71,
  java: 62, // Java
  c: 50, // C
  cpp: 54 // C++
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (API_KEY) {
    headers['X-RapidAPI-Key'] = API_KEY;
    headers['X-RapidAPI-Host'] = API_HOST;
  }
  return headers;
};

// Base64 Helpers
const encodeB64 = (str) => {
  if (!str) return '';
  return Buffer.from(str).toString('base64');
};

const decodeB64 = (str) => {
  if (!str) return '';
  return Buffer.from(str, 'base64').toString('utf-8');
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run code via Judge0 API
 */
export const runJudge0 = async (language, code, input, expectedOutput = '') => {
  const langId = LANGUAGE_IDS[language.toLowerCase()];
  if (!langId) {
    throw new Error(`Unsupported language for Judge0: ${language}`);
  }

  const payload = {
    language_id: langId,
    source_code: encodeB64(code),
    stdin: encodeB64(input),
    expected_output: expectedOutput ? encodeB64(expectedOutput) : null
  };

  try {
    // 1. Submit the code
    const submitUrl = `${API_URL}/submissions?base64_encoded=true&wait=false`;
    const submitRes = await fetch(submitUrl, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });

    if (!submitRes.ok) {
      const errText = await submitRes.text();
      throw new Error(`Submission failed: ${errText}`);
    }

    const { token } = await submitRes.json();
    if (!token) {
      throw new Error('No execution token returned by Judge0');
    }

    // 2. Poll for results
    let attempts = 0;
    const maxAttempts = 15;
    
    while (attempts < maxAttempts) {
      await sleep(1000);
      attempts++;

      const statusUrl = `${API_URL}/submissions/${token}?base64_encoded=true`;
      const statusRes = await fetch(statusUrl, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!statusRes.ok) {
        throw new Error(`Failed to fetch status: ${await statusRes.text()}`);
      }

      const result = await statusRes.json();
      const statusId = result.status?.id;

      // Status IDs: 1 (In Queue), 2 (Processing)
      if (statusId !== 1 && statusId !== 2) {
        // Finished
        return {
          status: result.status?.description || 'Accepted',
          stdout: decodeB64(result.stdout),
          stderr: decodeB64(result.stderr) || decodeB64(result.compile_output),
          time: parseFloat(result.time || 0) * 1000, // convert to ms
          memory: result.memory || 0
        };
      }
    }

    throw new Error('Execution timed out polling Judge0 API');
  } catch (error) {
    console.error("Judge0 API Error:", error.message);
    throw error;
  }
};
