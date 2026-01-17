import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      } else {
        navigate('/text-to-speech');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError('');
    try {
      const loginFn = provider === 'google' ? signInWithGoogle : signInWithGithub;
      const { error: socialError } = await loginFn();
      if (socialError) setError(socialError.message);
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-light-gray)] p-[var(--space-md)]">
      <div className="w-full max-w-[448px] p-[var(--space-xl)] bg-white rounded-[16px] shadow-xl border border-[var(--border-slate)]">
        <div className="mb-[var(--space-xl)] text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-[var(--space-xs)]">VoxAI</h1>
          <p className="text-[var(--text-secondary)] text-[var(--text-base)]">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-[var(--space-md)] p-[var(--space-sm)] bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-red-700 text-[var(--text-sm)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-[var(--space-md)]">
          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--text-primary)] mb-[var(--space-sm)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-[var(--space-md)] py-[var(--space-sm)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-[var(--text-primary)] bg-white"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--text-primary)] mb-[var(--space-sm)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-[var(--space-md)] py-[var(--space-sm)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-[var(--text-primary)] bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-[var(--space-md)] bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--primary-hover)] transition-all hover:shadow-md disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-[var(--space-lg)]">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-slate)]"></div>
            </div>
            <div className="relative flex justify-center text-[var(--text-sm)]">
              <span className="px-[var(--space-sm)] bg-white text-[var(--text-secondary)]">Or continue with</span>
            </div>
          </div>

          <div className="mt-[var(--space-lg)] grid grid-cols-2 gap-[var(--space-sm)]">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center px-[var(--space-md)] py-[var(--space-sm)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-light-gray)] transition-colors bg-white"
            >
              <span className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center px-[var(--space-md)] py-[var(--space-sm)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-light-gray)] transition-colors bg-white"
            >
              <span className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-[var(--space-lg)] text-center text-[var(--text-sm)] text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[var(--primary)] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
