import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData
      );

      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        toast.success('Login successful!');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - SK Printers</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl font-black text-white mb-2">
              SK <span className="text-yellow-300">Printers</span>
            </div>
            <p className="text-white/80">Admin Panel</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FaLock className="text-primary-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="label">
                  <FaEnvelope className="inline mr-2 text-primary-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="admin@skprinters.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <FaLock className="inline mr-2 text-primary-600" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-lg"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner w-5 h-5 border-2 mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Default Credentials Info */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-semibold mb-2">
                🔑 Default Admin Credentials:
              </p>
              <p className="text-sm text-yellow-700">
                Email: <code className="bg-yellow-100 px-2 py-1 rounded">admin@skprinters.com</code>
              </p>
              <p className="text-sm text-yellow-700">
                Password: <code className="bg-yellow-100 px-2 py-1 rounded">Admin@123</code>
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                ⚠️ Please change these credentials after first login!
              </p>
            </div>

            {/* Back to Site */}
            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-primary-600">
                ← Back to website
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white/60 text-sm">
            © 2024 SK Printers. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
