import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Phone,
  Mail,
  MessageSquare,
  Search,
  BookOpen,
  Clock,
  MapPin,
  Globe,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como faço para alterar minha reserva?",
    answer: "Você pode alterar sua reserva através do Portal do Cliente, acessando a seção 'Minhas Reservas'. Alternativamente, entre em contato com nosso atendimento ao cliente.",
  },
  {
    question: "Qual é a política de bagagem?",
    answer: "A política de bagagem varia de acordo com sua classe de viagem e destino. Consulte as informações específicas no momento da compra ou em nossa página de bagagem.",
  },
  {
    question: "Como solicito um reembolso?",
    answer: "Os reembolsos podem ser solicitados através do Portal do Cliente ou entrando em contato com nosso atendimento. O prazo de processamento varia de acordo com o método de pagamento.",
  },
];

const HelpScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Como podemos ajudar?</h1>
          <p className="text-xl text-blue-200">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Pesquise sua dúvida..."
            className="w-full p-4 pl-12 rounded-lg bg-white/10 backdrop-blur-lg text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:border-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200" />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Telefone</h3>
            </div>
            <p className="text-blue-200 mb-4">Atendimento 24/7</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              +55 11 4000-0000
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <Mail className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">E-mail</h3>
            </div>
            <p className="text-blue-200 mb-4">Suporte por e-mail</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              atendimento@latam.com
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Chat</h3>
            </div>
            <p className="text-blue-200 mb-4">Atendimento em tempo real</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Iniciar Chat
            </Button>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center cursor-pointer"
          >
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white">Manual do Passageiro</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center cursor-pointer"
          >
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white">Status do Voo</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center cursor-pointer"
          >
            <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white">Localizador de Bagagem</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center cursor-pointer"
          >
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white">Informações de Viagem</p>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/20 pb-4"
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-blue-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-blue-200 mt-2"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen; 