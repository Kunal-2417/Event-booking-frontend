import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../firebase/auth'; // Firebase login function
import { useAuth } from '../context/AuthProvider'; // Auth context
import bgimg from "../assets/images/images/about_bg.jpg";
import Preloader from "../components/Preloader";
import API_BASE_URL from '../config';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await loginWithEmail(email, password);
      const { user } = userCredential;
      const idToken = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(backendUser.user.role)
        throw new Error(data.error || 'Login failed on backend');
      }

      const backendUser = await response.json();
      const userData = {
        uid: user.uid,
        email: user.email,
        role: backendUser.user.role?.trim().toLowerCase(),
      };

      console.log('✅ Backend User:', backendUser);
      setUser(userData);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));

      // ✅ Redirect based on role
      switch (userData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'event_manager':
          navigate('/event-manager/dashboard');
          break;
        case 'staff':
          navigate('/staff/dashboard');
          break;
        case 'client':
          navigate('/client/dashboard');
          break;
        default:
          setError('Invalid role');
          return;
      }

      window.location.reload();

    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Preloader />
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-full max-w-2xl bg-opacity-80"
        >
          <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
