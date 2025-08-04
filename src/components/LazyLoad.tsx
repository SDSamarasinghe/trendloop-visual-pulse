import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyLoadProps {
  children: ReactNode;
  /** Placeholder content while loading */
  placeholder?: ReactNode;
  /** Intersection observer threshold */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Custom className */
  className?: string;
}

/**
 * Lazy loading component with intersection observer
 * Optimizes performance by only rendering content when it's about to be visible
 */
const LazyLoad = ({ 
  children, 
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}: LazyLoadProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          // Once loaded, we can stop observing
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {isIntersecting || hasLoaded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      ) : (
        placeholder || (
          <div className="w-full h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        )
      )}
    </div>
  );
};

export default LazyLoad;
