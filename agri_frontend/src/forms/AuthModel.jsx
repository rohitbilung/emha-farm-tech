import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api, { API_ENDPOINTS } from '../config/api'
import {useAuth} from '../context/AuthContext'

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const {login} = useAuth(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const endPoint = isLoginView
      ? API_ENDPOINTS.LOGIN
      : API_ENDPOINTS.REGISTER

    const payload = isLoginView
      ? { email: formData.email, password: formData.password } // Mapping email to username field
      : { name: formData.name, email: formData.email, password: formData.password };

    try {

      const response = await api.post(endPoint, payload);

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      if (isLoginView) {
        const userData = response.data.userlogin;
        const token = response.data.token;
        localStorage.setItem('emhaToken', token)
        localStorage.setItem('emhaUser', JSON.stringify(userData));
        login(userData, token);
        if(userData.role === 'farmer'){
          navigate('/farmer')
        }else if(userData.role === 'admin'){
          navigate('/admin');
        }else{
          setMessage({ type: 'error', text: 'This email is not register or authorized.' });
          // setIsLoginView(false);
        }
        // onClose();

      } else {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setIsLoginView(true);
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Try again.';
      setMessage({ type: 'error', text: errorMessage || 'Something went wrong. Try again.' });
      console.error("Auth Error:", error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>

          <div className="p-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {isLoginView ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mb-8">
              {isLoginView ? 'Sign in to access your farm-fresh orders.' : 'Join the EmhaFarm community today.'}
            </p>
            {/* Feedback Message */}
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm mb-6 flex items-center gap-3 font-bold ${message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
              >
                {message.type === 'error' && <AlertCircle size={14} />}
                {message.text}
              </motion.div>
            )}

            <form className="space-y-4" onSubmit={handleAuth} method='POST'>
              {!isLoginView && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-500 transition" />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  required
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-500 transition" />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  required
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-500 transition" />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2 group shadow-lg shadow-green-100 disabled:bg-gray-400 disabled:shadow-none"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {isLoginView ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLoginView ? "Don't have an account?" : "Already a member?"}{' '}
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setMessage({ type: '', text: '' });
                  }}
                  className="text-green-600 font-bold hover:underline ml-1"
                >
                  {isLoginView ? 'Register here' : 'Login now'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};