import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundVideoProps {
  /** Video source URL or path to video file */
  src: string;
  /** Fallback image for devices that don't support video */
  poster?: string;
  /** Additional CSS classes */
  className?: string;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Whether to show loading state */
  showLoading?: boolean;
}

/**
 * Responsive background video component with accessibility and performance optimizations
 * Handles video loading, error states, and provides proper fallbacks
 */
const BackgroundVideo = ({ 
  src, 
  poster, 
  className = '',
  overlayOpacity = 0.3,
  showLoading = true
}: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      console.warn('Background video failed to load:', src);
    };

    const handleCanPlay = () => {
      // Ensure video plays on supported devices
      video.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
        setHasError(true);
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  // Don't render video if user prefers reduced motion
  if (isReduced) {
    return (
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className}`}
        style={{
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Loading State */}
      {isLoading && showLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Video Element */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        {/* Fallback content */}
        Your browser does not support the video tag.
      </motion.video>

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
};

export default BackgroundVideo;
