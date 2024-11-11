import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:7000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allowed-Origin': '*',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success('New user created successfully. You can now login');
      } else if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful');
        window.location.href = '/dashboard';
      } else {
        toast.error(data.message || 'invalid username or password');
      }
    } catch (error) {
      toast.error('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="bottom-right" />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-grap-700 mb-2 block">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-grap-700 mb-2 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
