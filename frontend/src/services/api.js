const BASE_URL = 'http://localhost:5000/api';

const getUserId = () => {
  return localStorage.getItem('geonixa_username') || 'guest';
};

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Inject X-User-Id header if user is authenticated
  const headers = {
    'Content-Type': 'application/json',
    'X-User-Id': getUserId(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errText = await response.text();
    let errorMsg = 'API request failed';
    try {
      const errJson = JSON.parse(errText);
      errorMsg = errJson.error || errorMsg;
    } catch (_) {
      errorMsg = errText || errorMsg;
    }
    throw new Error(errorMsg);
  }

  return response.json();
};

export const api = {
  // Problems API
  getProblems: (params = {}) => {
    const query = new URLSearchParams({
      userId: getUserId(),
      ...params
    }).toString();
    return request(`/problems?${query}`);
  },

  getProblem: (id) => {
    const query = new URLSearchParams({ userId: getUserId() }).toString();
    return request(`/problems/${id}?${query}`);
  },

  toggleBookmark: (id) => {
    return request(`/problems/${id}/bookmark`, {
      method: 'POST',
      body: JSON.stringify({ userId: getUserId() })
    });
  },

  saveNotes: (id, note) => {
    return request(`/problems/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ userId: getUserId(), note })
    });
  },

  getNotes: (id) => {
    const query = new URLSearchParams({ userId: getUserId() }).toString();
    return request(`/problems/${id}/notes?${query}`);
  },

  // Compiler API
  runCode: (problemId, language, code, customInput) => {
    return request('/submissions/run', {
      method: 'POST',
      body: JSON.stringify({
        userId: getUserId(),
        problemId,
        language,
        code,
        customInput
      })
    });
  },

  submitCode: (problemId, language, code) => {
    return request('/submissions/submit', {
      method: 'POST',
      body: JSON.stringify({
        userId: getUserId(),
        problemId,
        language,
        code
      })
    });
  },

  getSubmissionHistory: (problemId) => {
    const query = new URLSearchParams({
      userId: getUserId(),
      problemId
    }).toString();
    return request(`/submissions/history?${query}`);
  },

  // Projects API
  getProjects: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const endpoint = query ? `/projects?${query}` : '/projects';
    return request(endpoint);
  },

  getProject: (id) => {
    return request(`/projects/${id}`);
  },

  searchProjects: (q) => {
    return request(`/projects/search?q=${encodeURIComponent(q)}`);
  },

  getProjectsByCategory: (category) => {
    return request(`/projects/category/${encodeURIComponent(category)}`);
  },

  // User Stats & Extras
  getDashboardStats: () => {
    const query = new URLSearchParams({ userId: getUserId() }).toString();
    return request(`/dashboard?${query}`);
  },

  getLeaderboard: () => {
    const query = new URLSearchParams({ userId: getUserId() }).toString();
    return request(`/leaderboard?${query}`);
  },

  getContests: () => {
    return request('/contests');
  }
};
