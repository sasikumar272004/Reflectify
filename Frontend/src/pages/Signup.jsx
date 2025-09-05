import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "@tsparticles/react";
import { loadFull } from 'tsparticles';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const navigate = useNavigate();
  const controls = useAnimation();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#a5b4fc", "#c7d2fe", "#e9d5ff", "#fbcfe8", "#fecaca"]
      },
      shape: {
        type: ["circle", "triangle", "star"],
        stroke: {
          width: 0,
          color: "#ffffff"
        },
        polygon: {
          nb_sides: 6
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#93c5fd",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 800,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8
          }
        },
        bubble: {
          distance: 300,
          size: 30,
          duration: 2,
          opacity: 6,
          speed: 2
        },
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true,
    background: {
      color: "#f8fafc",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await controls.start({
        scale: 0.98,
        transition: { duration: 0.2 }
      });

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccess(true);
      await controls.start({
        scale: 1,
        transition: { type: 'spring', stiffness: 300 }
      });

      toast.success(isLogin ? 'Login successful! 🎉' : 'Registration successful! 🎉');

      setTimeout(() => navigate('/Home'), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      await controls.start({
        x: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = async () => {
    await controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    });
    setIsLogin(!isLogin);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="absolute inset-0 -z-10">
        <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full filter blur-[80px] opacity-30 ${i % 2 === 0 ? 'bg-gradient-to-br from-blue-200 to-purple-200' : 'bg-gradient-to-br from-pink-200 to-amber-200'}`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              transition: {
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 3 === 0 ? 'triangle' : i % 3 === 1 ? 'hexagon' : 'circle'} opacity-10`}
            style={{
              width: `${150 + i * 30}px`,
              height: `${150 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'conic-gradient(from 180deg, #93c5fd, #a5b4fc)' : 'conic-gradient(from 90deg, #fbcfe8, #fecaca)'
            }}
            animate={{
              rotate: [0, 360],
              y: [0, Math.random() * 100 - 50],
              transition: {
                duration: 30 + i * 10,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            className="absolute inset-0 bg-white/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-center"
            >
              <IoMdCheckmarkCircleOutline className="w-32 h-32 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-700 mb-2">Success!</h2>
              <p className="text-xl text-gray-500 mb-8">You're being redirected...</p>
              <motion.div
                className="h-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        toastClassName="shadow-lg rounded-xl"
        progressClassName="bg-gradient-to-r from-blue-300 to-purple-300"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={controls}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20 relative"
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 text-center relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{
                x: ['0%', '100%'],
                transition: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            />
            <motion.h2 
              className="text-4xl font-bold text-gray-700 mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h2>
            <motion.p 
              className="text-gray-500 font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? 'Sign in to continue' : 'Join us today'}
            </motion.p>
          </motion.div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                      activeField === 'name' 
                        ? 'border-blue-400 ring-blue-100 bg-blue-50' 
                        : 'border-gray-200 focus:border-blue-400 bg-white'
                    }`}
                    placeholder="Full Name"
                  />
                </motion.div>
              )}

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.2 : 0.3 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                    activeField === 'email' 
                      ? 'border-blue-400 ring-blue-100 bg-blue-50' 
                      : 'border-gray-200 focus:border-blue-400 bg-white'
                  }`}
                  placeholder="Email Address"
                />
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.3 : 0.4 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  required
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                    activeField === 'password' 
                      ? 'border-blue-400 ring-blue-100 bg-blue-50' 
                      : 'border-gray-200 focus:border-blue-400 bg-white'
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.5 : 0.6 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(147, 197, 253, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 text-white font-medium py-4 rounded-xl transition-all ${
                    loading ? 'bg-blue-300' : 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500'
                  } shadow-md hover:shadow-lg`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Sign Up'}
                      <motion.span
                        animate={{
                          x: [0, 5, 0],
                          transition: { repeat: Infinity, duration: 1.5 }
                        }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div 
              className="mt-6 text-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:text-blue-600 font-medium relative"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        .circle {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Signup;