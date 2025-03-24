import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiGlobe, FiActivity, FiInfo } from 'react-icons/fi';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const quickActions = [
    { icon: '📋', title: 'Check-in', path: '/check-in' },
    { icon: '🎫', title: 'Reservas', path: '/bookings' },
    { icon: '✈️', title: 'Status do Voo', path: '/flight-status' },
    { icon: '🎁', title: 'Programa Fidelidade', path: '/loyalty' }
  ];

  const systemStatus = {
    flights: { status: 'Operacional', count: 156 },
    crew: { status: 'Disponível', count: 89 },
    aircraft: { status: 'Ativo', count: 45 },
    maintenance: { status: 'Em dia', count: 12 }
  };

  const recentUpdates = [
    { title: 'Novo sistema de gestão de bagagem', date: '2024-03-24' },
    { title: 'Atualização da interface do usuário', date: '2024-03-23' },
    { title: 'Novos destinos disponíveis', date: '2024-03-22' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-4">
          <FiGlobe className="text-white text-xl" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-white border border-white/30 rounded px-2 py-1"
          >
            <option value="pt-BR">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <FiBell className="text-white text-xl cursor-pointer hover:text-blue-200" />
          <FiInfo className="text-white text-xl cursor-pointer hover:text-blue-200" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl relative z-10 mt-16"
      >
        <div className="text-center">
          {/* LATAM Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <img 
              src="/latam-seeklogo.png" 
              alt="LATAM Logo" 
              className="h-20 mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Bem-vindo ao Sistema de Gestão LATAM
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-200 mb-12"
          >
            Uma solução completa para gerenciamento de operações aéreas
          </motion.p>

          {/* Quick Actions */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => navigate(action.path)}
                className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="text-white font-semibold">{action.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {Object.entries(systemStatus).map(([key, value]) => (
              <div key={key} className="bg-white/5 p-4 rounded-xl">
                <FiActivity className="text-white text-xl mb-2" />
                <h3 className="text-white font-semibold capitalize">{key}</h3>
                <p className="text-gray-300 text-sm">{value.status}</p>
                <p className="text-white font-bold">{value.count}</p>
              </div>
            ))}
          </motion.div>

          {/* Recent Updates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 p-6 rounded-xl mb-12 text-left"
          >
            <h3 className="text-white font-semibold mb-4">Últimas Atualizações</h3>
            {recentUpdates.map((update, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-300">{update.title}</p>
                <p className="text-gray-400 text-sm">{update.date}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Começar Agora
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-gray-300 text-sm"
            >
              Sistema otimizado para a LATAM Airlines
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen; 