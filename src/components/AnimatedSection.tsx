import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  /** Animation type */
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Custom className */
  className?: string;
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  /** Whether to animate only once */
  triggerOnce?: boolean;
}

/**
 * Reusable animated section component with intersection observer
 * Provides smooth entrance animations when elements come into view
 */
const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  // Animation variants
  const variants: Record<string, Variants> = {
    fadeInUp: {
      hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    },
    fadeInLeft: {
      hidden: { 
        opacity: 0, 
        x: -60 
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    },
    fadeInRight: {
      hidden: { 
        opacity: 0, 
        x: 60 
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    },
    fadeIn: {
      hidden: { 
        opacity: 0 
      },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    scaleIn: {
      hidden: { 
        opacity: 0, 
        scale: 0.8 
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[animation]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
