import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

/**
 * Professional splash screen with animated logo and smooth transitions
 * Features a full-screen loader with modern animations
 */
const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Pure white overlay to prevent any color bleeding */}
          <div 
            className="fixed inset-0 z-40" 
            style={{ backgroundColor: '#ffffff' }}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: '#ffffff' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Clean white background - no gradient patterns */}
          {/* Clean white background - no gradient patterns */}

          {/* Main Content */}
          <div className="relative flex flex-col items-center space-y-8">
            {/* Logo/Brand */}
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.2 
              }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-black via-orange to-black bg-clip-text text-transparent"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                TRENDLOOP
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-black/70 font-medium tracking-wider mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                VISUAL PULSE
              </motion.p>
            </motion.div>

            {/* Animated Loading Indicator */}
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-gradient-to-r from-orange to-black rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Pulsing Ring Animation */}
            <motion.div
              className="absolute w-32 h-32 border border-orange/30 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-48 h-48 border border-orange/20 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          {/* Skip Button */}
          <motion.button
            className="absolute bottom-8 right-8 text-black/60 hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 rounded-md px-3 py-2"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onComplete, 800);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Skip splash screen"
          >
            Skip →
          </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
