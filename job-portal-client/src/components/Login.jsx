import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://synk-job-portal-server.vercel.app/api/login',
        { email, password },
        { withCredentials: true }  // Ensure cookies are sent with the request
      );

      if (response.data.user) {
        navigate('/');
        window.location.reload()  // Redirect to the home page after a successful login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/images/synk_logo.png" alt="Company Logo" className="h-20" />
        </div>
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <p className="text-center text-gray-600 mb-8">Welcome back! Please enter your credentials</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className={`w-full py-2 ${isLoading ? 'bg-gray-500' : 'bg-black'} text-white rounded-md transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          <div className="flex items-center justify-center mt-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>
          <button type="button" className="w-full py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out flex items-center justify-center">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign Up with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
