import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import dowearlogo from '../assets/dowear-logo.svg'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
  const { handleSignup } = useAuth(); // accessing handleSignup from AuthContext
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    user_address: '',
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false); // for form submission
  const [citiesLoading, setCitiesLoading] = useState(true); // for cities fetching
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // fetch cities from the backend (will change)
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/cities`);
        if (!response.ok) throw new Error('Failed to fetch cities');
        const citiesEnum = await response.json();
        setCities(citiesEnum);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to load city options.');
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);

  // to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await handleSignup(formData); // register user
      alert('Signup successful!');
      navigate('/'); // redirect to homepage
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-[60%] lg:w-[60%] p-6">
        {/* logo, headers */}
        <div className="text-left">
          <img src={dowearlogo} alt="DoWear Logo" className="w-[100px]" />
          <div className="mt-5">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-[#979797] mt-2">Create an account to use DoWear.</p>
          </div>
        </div>
        {/* sign up form */}
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="flex flex-col w-full sm:w-[48%]">
              <label htmlFor="email" className="text-md font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm"
                required
              />
              <label htmlFor="user_address" className="text-md font-medium mt-4">City Address</label>
              <select
                id="user_address"
                value={formData.user_address}
                onChange={handleChange}
                className="w-full py-4 px-3 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm"
                required
              >
                <option value="" disabled>Select city</option>
                {citiesLoading ? (
                  <option disabled>Loading cities...</option>
                ) : (
                  cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col w-full sm:w-[48%]">
              <label htmlFor="username" className="text-md font-medium">Username</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm"
                required
              />
              <label htmlFor="password" className="text-md font-medium mt-4">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <button
            type="submit"
            className={`w-[70%] sm:w-[40%] py-3 mt-10 bg-dowear-red text-white rounded-lg ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
