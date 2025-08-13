import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Calendar, FileText, Phone, Mail, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'bot' | 'user', timestamp: Date}>>([]);

  const chatOptions = [
    {
      id: 'meeting',
      icon: Calendar,
      title: 'Book a Meeting',
      description: "Let's discuss your next visual project and bring your creative vision to life.",
      action: 'Schedule Call',
      color: 'from-orange to-orange/80'
    },
    {
      id: 'quote',
      icon: FileText,
      title: 'Get a Project Quote',
      description: 'Get a personalized quote for your visual content needs - from social media to corporate videos.',
      action: 'Get Quote',
      color: 'from-black to-black/80'
    },
    {
      id: 'contact',
      icon: Phone,
      title: 'Quick Contact',
      description: 'Connect with us instantly for urgent queries or immediate assistance.',
      action: 'Contact Now',
      color: 'from-orange/80 to-black/80'
    }
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setSelectedOption(null);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([{
            id: 1,
            text: "Hello! 👋 Welcome to TrendLoop Visual Pulse. I'm here to help you create stunning visuals for your brand. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
          }]);
        }, 1500);
      }, 500);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = chatOptions.find(opt => opt.id === optionId);
    if (option) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `I'm interested in: ${option.title}`,
        sender: 'user',
        timestamp: new Date()
      }]);
      
      // Bot response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          let botResponse = "";
          if (optionId === 'meeting') {
            botResponse = "Perfect! I'd love to schedule a meeting with you. Click the button below to book a time that works best for you. Our team will discuss your project requirements and provide tailored solutions.";
          } else if (optionId === 'quote') {
            botResponse = "Great choice! To provide you with an accurate quote, I'll need some details about your project. Please fill out the form below and we'll get back to you within 24 hours.";
          } else if (optionId === 'contact') {
            botResponse = "I'm here to help! You can reach us through multiple channels. What's the best way for you to connect with our team?";
          }
          
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }, 1000);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 2 
        }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative group bg-gradient-to-r from-orange to-black text-white p-4 rounded-full shadow-2xl hover:shadow-glow transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6" />
                {/* Notification dot */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-orange/30"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-orange/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange to-black text-white p-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl font-bold">TL</span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">TrendLoop Team</h3>
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm text-white/80">Online now</span>
                    </div>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="h-96 flex flex-col">
                {!selectedOption ? (
                  <div className="flex-1 p-6 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Messages */}
                      <div className="space-y-4 mb-6">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-xl ${
                                message.sender === 'user'
                                  ? 'bg-gradient-to-r from-orange to-black text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-100 p-3 rounded-xl">
                              <div className="flex space-x-1">
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                      duration: 0.5,
                                      repeat: Infinity,
                                      delay: i * 0.1
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Quick Actions */}
                      {messages.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600 font-medium">How can I help you today?</p>
                          {chatOptions.map((option, index) => (
                            <motion.button
                              key={option.id}
                              onClick={() => handleOptionSelect(option.id)}
                              className={`w-full text-left p-4 rounded-xl border-2 border-transparent hover:border-orange/30 transition-all duration-300 bg-gradient-to-r ${option.color} text-white group`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <option.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-semibold mb-1">{option.title}</h4>
                                  <p className="text-sm text-white/80 leading-relaxed">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex-1 p-6 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Back Button */}
                      <button
                        onClick={() => setSelectedOption(null)}
                        className="text-orange hover:text-black transition-colors text-sm font-medium mb-4 flex items-center"
                      >
                        ← Back to chat
                      </button>

                      {/* Selected Option Content */}
                      {selectedOption === 'meeting' && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <Calendar className="h-12 w-12 text-orange mx-auto mb-3" />
                            <h4 className="font-bold text-lg text-black mb-2">Schedule a Meeting</h4>
                            <p className="text-gray-600 mb-6">
                              Let's discuss your vision and create something amazing together!
                            </p>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-orange to-black hover:from-orange/90 hover:to-black/90 text-white font-semibold py-3 rounded-xl"
                            onClick={() => window.open('https://calendly.com/trendloop', '_blank')}
                          >
                            Book Your Meeting
                          </Button>
                        </div>
                      )}

                      {selectedOption === 'quote' && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <FileText className="h-12 w-12 text-orange mx-auto mb-3" />
                            <h4 className="font-bold text-lg text-black mb-2">Get Your Quote</h4>
                            <p className="text-gray-600 mb-6">
                              Tell us about your project and get a personalized quote!
                            </p>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Your name"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange focus:ring-1 focus:ring-orange"
                            />
                            <input
                              type="email"
                              placeholder="Your email"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange focus:ring-1 focus:ring-orange"
                            />
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange focus:ring-1 focus:ring-orange">
                              <option>Select project type</option>
                              <option>Social Media Content</option>
                              <option>Corporate Video</option>
                              <option>Event Photography</option>
                              <option>Film & Music Video</option>
                            </select>
                            <textarea
                              placeholder="Tell us about your project..."
                              rows={3}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange focus:ring-1 focus:ring-orange resize-none"
                            />
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-orange to-black hover:from-orange/90 hover:to-black/90 text-white font-semibold py-3 rounded-xl"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Quote Request
                          </Button>
                        </div>
                      )}

                      {selectedOption === 'contact' && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <Phone className="h-12 w-12 text-orange mx-auto mb-3" />
                            <h4 className="font-bold text-lg text-black mb-2">Quick Contact</h4>
                            <p className="text-gray-600 mb-6">
                              Choose your preferred way to connect with us
                            </p>
                          </div>

                          <div className="space-y-3">
                            <a 
                              href="tel:+1234567890"
                              className="w-full bg-gradient-to-r from-orange to-orange/80 text-white p-4 rounded-xl flex items-center justify-center space-x-3 hover:from-orange/90 hover:to-orange/70 transition-all"
                            >
                              <Phone className="h-5 w-5" />
                              <span>Call Us: +1 (234) 567-890</span>
                            </a>
                            
                            <a 
                              href="mailto:info@trendloop.com"
                              className="w-full bg-gradient-to-r from-black to-black/80 text-white p-4 rounded-xl flex items-center justify-center space-x-3 hover:from-black/90 hover:to-black/70 transition-all"
                            >
                              <Mail className="h-5 w-5" />
                              <span>Email: info@trendloop.com</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <p className="text-xs text-gray-500 text-center">
                    Powered by TrendLoop AI • Typically replies in minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
