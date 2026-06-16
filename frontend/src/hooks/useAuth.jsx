import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('geonixa_username');
    if (savedUser) {
      setUser({ username: savedUser });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');
    if (password.length < 4) throw new Error('Password must be at least 4 characters');
    
    localStorage.setItem('geonixa_username', username);
    setUser({ username });
    return { username };
  };

  const signup = async (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');
    if (username.length < 3) throw new Error('Username must be at least 3 characters');
    if (password.length < 4) throw new Error('Password must be at least 4 characters');

    localStorage.setItem('geonixa_username', username);
    setUser({ username });
    return { username };
  };

  const loginAsGuest = () => {
    localStorage.setItem('geonixa_username', 'guest');
    setUser({ username: 'guest' });
  };

  const logout = () => {
    localStorage.removeItem('geonixa_username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginAsGuest, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
