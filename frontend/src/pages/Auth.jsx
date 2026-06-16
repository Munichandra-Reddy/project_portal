import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/Toast';
import { Terminal, Lock, User, ArrowRight } from 'lucide-react';
import './Auth.css';

export const Auth = ({ setActivePage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, loginAsGuest } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warning('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(username, password);
        toast.success(`Welcome back, ${username}!`);
      } else {
        await signup(username, password);
        toast.success(`Account created! Welcome, ${username}!`);
      }
      setActivePage('dashboard');
    } catch (err) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    toast.success('Logged in as Guest. Progress will be cached!');
    setActivePage('dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Brand Banner */}
        <div className="auth-brand">
          <div className="auth-logo">
            <Terminal size={28} />
          </div>
          <h1 className="auth-title">Geonixa Code</h1>
          <p className="auth-subtitle">Learn. Compile. Build. Showcase.</p>
        </div>

        {/* Auth Panel Card */}
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              onClick={() => setIsLogin(true)}
              className={`auth-tab ${isLogin ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Username Input */}
            <div className="input-group">
              <label className="input-label">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                  placeholder="e.g. coder_dev"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={20} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="auth-submit-btn">
              {loading ? (
                <div className="spinner spinner-small" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Guest Route Toggle */}
          <div className="guest-divider">
            <span className="guest-text">Or explore the app instantly</span>
            <button onClick={handleGuestAccess} className="guest-btn">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
