import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Cpu, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the location they tried to access before being redirected to login
  const from = (location.state as any)?.from?.pathname || '/organizer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const body = isRegistering ? { email, password, name } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isRegistering) {
        // If they registered, immediately log them in (or tell them to check email)
        setIsRegistering(false);
        setError('Registration successful! Please login.');
      } else {
        // Login successful
        login(data.token, data.user);
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 border-3 border-black bg-nexus-accent flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Cpu className="text-black w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">Nexus<span className="text-nexus-accent mix-blend-difference">AI</span></h1>
        </div>

        <h2 className="text-2xl font-bold text-black mb-6 uppercase tracking-wider text-center">
          {isRegistering ? 'Enterprise Access' : 'B2B Login'}
        </h2>

        {error && (
          <div className={`p-4 mb-6 border-2 font-bold ${error.includes('successful') ? 'border-green-500 bg-green-100 text-green-800' : 'border-red-500 bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div>
              <label className="block text-black font-bold uppercase text-sm mb-2">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-3 border-black bg-white p-3 font-medium text-black focus:outline-none focus:ring-2 focus:ring-nexus-accent"
                placeholder="Acme Corp"
              />
            </div>
          )}

          <div>
            <label className="block text-black font-bold uppercase text-sm mb-2">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-3 border-black bg-white p-3 font-medium text-black focus:outline-none focus:ring-2 focus:ring-nexus-accent"
              placeholder="alex@acme.com"
            />
          </div>

          <div>
            <label className="block text-black font-bold uppercase text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-3 border-black bg-white p-3 font-medium text-black focus:outline-none focus:ring-2 focus:ring-nexus-accent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-black uppercase py-4 border-2 border-black hover:bg-nexus-accent hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            {loading ? 'Processing...' : (isRegistering ? 'Register AWS Identity' : 'Authenticate')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-black pt-6">
          <p className="text-black font-medium">
            {isRegistering ? 'Already have access?' : 'Need enterprise access?'}
          </p>
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="text-nexus-accent font-black uppercase mt-2 hover:underline mix-blend-difference"
          >
            {isRegistering ? 'Login Here' : 'Apply for Portal'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
