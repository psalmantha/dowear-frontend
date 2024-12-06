import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginImg from '../assets/login-img.svg'
import DowearLogo from '../assets/dowear-logo.svg'

function LoginPage() {
  const { handleLogin } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // console.log('Submitted credentials:', credentials);
    
    try {
      const response = await handleLogin(credentials); // send login request
      navigate('/');  // navigate after successful log in
    } catch (error) {
      console.error('Login error:', error, error.response?.data);
      setError(error.message || 'Invalid username or password.');
    }
  };
  
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex items-center justify-end w-full md:w-[50%]">
        <img
          src={LoginImg}
          alt="Log in Promotional Graphic"
          className="hidden md:block w-[70%] h-auto max-h-[85%] object-contain"
        />
      </div>
      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full h-screen md:h-auto md:w-[40%] md:pr-8">
        <img 
          src={DowearLogo} 
          alt="Dowear Logo" 
          className="h-16 mb-4" 
        />
        <h1 className="text-[40px] md:text-[42px] font-bold mb-[1px] tracking-tight text-center md:text-center">
          Welcome back!
        </h1>
        <p className="text-sm text-[#979797] mb-8 tracking-tight text-center md:text-left">
          Please log in to your account.
        </p>
        {/* log in form */}
        <form 
          className="w-[65%] max-w-md" 
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-5 mb-6 border border-[#D3D3D3] bg-[#F3F4F8] rounded-[14px] text-sm focus:outline-none"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-5 mb-4 border border-[#D3D3D3] bg-[#F3F4F8] rounded-[14px] text-sm focus:outline-none"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-dowear-red text-white py-4 rounded-lg hover:bg-[#ff3e3e]"
          >
            Log in
          </button>
        </form>
        <p className="text-sm text-[#979797] mt-8">
          Don't have an account?{" "}
          <Link to="/signup" 
            className="text-[#FF6F61] font-light hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
