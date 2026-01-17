import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password);
      if (signUpError) throw signUpError;
      
      alert('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError(null);
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
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-[var(--space-xs)] leading-tight">Create Account</h1>
          <p className="text-[var(--text-secondary)] text-[var(--text-base)]">Join VoxAI to start generating voices</p>
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

          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--text-primary)] mb-[var(--space-sm)]">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating account...' : 'Sign Up'}
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
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--primary)] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignupPage };
