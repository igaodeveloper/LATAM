import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plane, Users, UserCircle } from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="mb-8">
          <img
            src="/latam-seeklogo.png"
            alt="LATAM Airlines Logo"
            className="h-24 mx-auto mb-4 bg-white p-2 rounded-lg"
          />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Bem-vindo à LATAM Airlines
        </h1>
        <p className="text-xl text-blue-200">
          Sua plataforma completa de gestão aeronáutica
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex flex-col items-center text-center">
            <Plane className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Área Administrativa
            </h3>
            <p className="text-blue-200">
              Acesse o painel de controle e ferramentas de gestão
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
          onClick={() => navigate("/portal-cliente")}
        >
          <div className="flex flex-col items-center text-center">
            <UserCircle className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Portal do Cliente
            </h3>
            <p className="text-blue-200">
              Gerencie suas reservas e informações pessoais
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
          onClick={() => navigate("/checkin-online")}
        >
          <div className="flex flex-col items-center text-center">
            <Users className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Check-in Online
            </h3>
            <p className="text-blue-200">
              Faça seu check-in e selecione seu assento
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Button
          variant="outline"
          className="text-black border-black hover:bg-white/10"
          onClick={() => navigate("/help")}
        >
          Precisa de ajuda?
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen; 