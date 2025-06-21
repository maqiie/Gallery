import { fetchMedia } from "../services/api";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTransition, animated, useSpring, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import logo from '../../src/ujenzi.ico';

const ScreenSaver = ({ projectId }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transitionIndex, setTransitionIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [preloadedMedia, setPreloadedMedia] = useState(new Set());
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const screenSaverRef = useRef(null);
  const videoRefs = useRef({});
  const hideControlsTimeout = useRef(null);
  const intervalRef = useRef(null);
  const preloadCache = useRef(new Map());
  const transitionTimeout = useRef(null);

  // Fixed transition configurations with consistent transform structures
  const smoothTransitions = useMemo(() => [
    // Cinematic fade with subtle scale
    {
      name: "Cinematic Fade",
      from: { opacity: 0, transform: 'scale(1.02) translateX(0px) translateY(0px)' },
      enter: { opacity: 1, transform: 'scale(1) translateX(0px) translateY(0px)' },
      leave: { opacity: 0, transform: 'scale(0.98) translateX(0px) translateY(0px)' },
      config: { ...config.molasses, duration: 1200 }
    },
    // Liquid slide - ultra smooth
    {
      name: "Liquid Slide",
      from: { opacity: 0, transform: 'translateX(100px) scale(0.95) translateY(0px)' },
      enter: { opacity: 1, transform: 'translateX(0px) scale(1) translateY(0px)' },
      leave: { opacity: 0, transform: 'translateX(-100px) scale(0.95) translateY(0px)' },
      config: { tension: 120, friction: 35, mass: 1.2 }
    },
    // Ethereal blur transition
    // Fixed: Ethereal Blur with full filter arity
{
  name: "Ethereal Blur",
  from: { 
    opacity: 0, 
    filter: 'blur(25px) contrast(1) saturate(1) brightness(1)', 
    transform: 'scale(1.1) translateX(0px) translateY(0px)' 
  },
  enter: { 
    opacity: 1, 
    filter: 'blur(0px) contrast(1) saturate(1) brightness(1)', 
    transform: 'scale(1) translateX(0px) translateY(0px)' 
  },
  leave: { 
    opacity: 0, 
    filter: 'blur(25px) contrast(1) saturate(1) brightness(1)', 
    transform: 'scale(0.9) translateX(0px) translateY(0px)' 
  },
  config: { tension: 160, friction: 40, precision: 0.01 }
},

    // Morphing scale - simplified
    {
      name: "Morphing Scale",
      from: { opacity: 0, transform: 'scale(0.3) translateX(0px) translateY(0px)' },
      enter: { opacity: 1, transform: 'scale(1) translateX(0px) translateY(0px)' },
      leave: { opacity: 0, transform: 'scale(0.3) translateX(0px) translateY(0px)' },
      config: { tension: 200, friction: 30, mass: 1 }
    },
    // Slide transition - consistent structure
    {
      name: "Smooth Slide",
      from: { 
        opacity: 0, 
        transform: transitionDirection === 'forward' 
          ? 'translateX(100px) translateY(0px) scale(1)' 
          : 'translateX(-100px) translateY(0px) scale(1)' 
      },
      enter: { opacity: 1, transform: 'translateX(0px) translateY(0px) scale(1)' },
      leave: { 
        opacity: 0, 
        transform: transitionDirection === 'forward' 
          ? 'translateX(-100px) translateY(0px) scale(1)' 
          : 'translateX(100px) translateY(0px) scale(1)' 
      },
      config: { tension: 180, friction: 32, mass: 1.1 }
    },
    // Zoom transition
    {
      name: "Zoom Effect",
      from: { 
        opacity: 0, 
        transform: 'scale(0.8) translateX(0px) translateY(0px)',
        filter: 'contrast(1.2) saturate(1.3)'
      },
      enter: { 
        opacity: 1, 
        transform: 'scale(1) translateX(0px) translateY(0px)',
        filter: 'contrast(1) saturate(1)'
      },
      leave: { 
        opacity: 0, 
        transform: 'scale(1.2) translateX(0px) translateY(0px)',
        filter: 'contrast(0.8) saturate(0.7)'
      },
      config: { tension: 200, friction: 35, mass: 0.9 }
    },
    // Vertical slide
    {
      name: "Vertical Slide",
      from: { 
        opacity: 0, 
        transform: 'translateX(0px) translateY(50px) scale(0.95)'
      },
      enter: { 
        opacity: 1, 
        transform: 'translateX(0px) translateY(0px) scale(1)'
      },
      leave: { 
        opacity: 0, 
        transform: 'translateX(0px) translateY(-50px) scale(0.95)'
      },
      config: { tension: 150, friction: 28, mass: 1.3 }
    },
    // Diagonal slide
    {
      name: "Diagonal Slide",
      from: { 
        opacity: 0, 
        transform: 'translateX(50px) translateY(50px) scale(0.9)'
      },
      enter: { 
        opacity: 1, 
        transform: 'translateX(0px) translateY(0px) scale(1)'
      },
      leave: { 
        opacity: 0, 
        transform: 'translateX(-50px) translateY(-50px) scale(0.9)'
      },
      config: { tension: 170, friction: 30, mass: 1.2 }
    },
    // Bounce effect
    {
      name: "Bounce In",
      from: { 
        opacity: 0, 
        transform: 'scale(0.3) translateX(0px) translateY(0px)',
        filter: 'brightness(1.2)'
      },
      enter: { 
        opacity: 1, 
        transform: 'scale(1) translateX(0px) translateY(0px)',
        filter: 'brightness(1)'
      },
      leave: { 
        opacity: 0, 
        transform: 'scale(0.3) translateX(0px) translateY(0px)',
        filter: 'brightness(0.8)'
      },
      config: { tension: 300, friction: 25, mass: 0.8 }
    },
    // Gentle fade
    {
      name: "Gentle Fade",
      from: { 
        opacity: 0, 
        transform: 'scale(1) translateX(0px) translateY(0px)',
        filter: 'blur(5px)'
      },
      enter: { 
        opacity: 1, 
        transform: 'scale(1) translateX(0px) translateY(0px)',
        filter: 'blur(0px)'
      },
      leave: { 
        opacity: 0, 
        transform: 'scale(1) translateX(0px) translateY(0px)',
        filter: 'blur(5px)'
      },
      config: { tension: 200, friction: 40, mass: 1 }
    }
  ], [transitionDirection]);

  // Intelligent transition selector
  const selectTransition = useCallback(() => {
    const weights = [
      { index: 0, weight: 0.2 }, // Cinematic fade - most common
      { index: 1, weight: 0.15 }, // Liquid slide
      { index: 2, weight: 0.15 }, // Ethereal blur
      { index: 3, weight: 0.1 }, // Morphing scale
      { index: 4, weight: 0.1 }, // Smooth slide
      { index: 5, weight: 0.08 }, // Zoom effect
      { index: 6, weight: 0.08 }, // Vertical slide
      { index: 7, weight: 0.06 }, // Diagonal slide
      { index: 8, weight: 0.05 }, // Bounce in
      { index: 9, weight: 0.03 }, // Gentle fade
    ];
    const random = Math.random();
    let accumulator = 0;
    
    for (const { index, weight } of weights) {
      accumulator += weight;
      if (random <= accumulator) {
        return index;
      }
    }
    return 0; // Fallback
  }, []);

  // Enhanced logo animation with breathing effect
  const logoSpring = useSpring({
    opacity: showControls ? 0.9 : 0.4,
    transform: showControls 
      ? 'scale(1.15) rotate(2deg)' 
      : 'scale(1) rotate(0deg)',
    filter: showControls 
      ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' 
      : 'drop-shadow(0 0 10px rgba(255,255,255,0.1))',
    config: { tension: 300, friction: 30 }
  });

  // Smooth controls animation
  const controlsSpring = useSpring({
    opacity: showControls ? 1 : 0,
    transform: showControls ? 'translateY(0px)' : 'translateY(30px)',
    backdropFilter: showControls ? 'blur(20px)' : 'blur(0px)',
    config: { tension: 250, friction: 35 }
  });

  // Advanced media preloading system
  const preloadMedia = useCallback(async (mediaItem) => {
    if (!mediaItem || preloadCache.current.has(mediaItem.url)) return;

    try {
      const isVideo = mediaItem.content_type?.startsWith("video");
      
      if (isVideo) {
        const video = document.createElement('video');
        video.src = mediaItem.url;
        video.preload = 'metadata';
        video.muted = true;
        
        await new Promise((resolve, reject) => {
          video.onloadeddata = resolve;
          video.onerror = reject;
          setTimeout(reject, 5000); // 5s timeout
        });
        
        preloadCache.current.set(mediaItem.url, video);
      } else {
        const img = new Image();
        img.src = mediaItem.url;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          setTimeout(reject, 5000); // 5s timeout
        });
        
        preloadCache.current.set(mediaItem.url, img);
      }
      
      setPreloadedMedia(prev => new Set([...prev, mediaItem.url]));
    } catch (error) {
      console.warn('Failed to preload media:', mediaItem.url, error);
    }
  }, []);

  // Smart preloading strategy
  useEffect(() => {
    if (mediaFiles.length > 0) {
      const preloadQueue = [];
      
      // Preload next 3 and previous 1 media items
      for (let i = -1; i <= 3; i++) {
        const index = (currentIndex + i + mediaFiles.length) % mediaFiles.length;
        if (index !== currentIndex) {
          preloadQueue.push(mediaFiles[index]);
        }
      }
      
      preloadQueue.forEach(media => preloadMedia(media));
    }
  }, [currentIndex, mediaFiles, preloadMedia]);

  // Load media files
  useEffect(() => {
    const loadMedia = async () => {
      try {
        setLoading(true);
        const response = await fetchMedia(projectId);
        
        if (response.media_files && response.media_files.length > 0) {
          const mediaFilesWithAbsoluteUrls = response.media_files.map((media, index) => ({
            ...media,
            url: new URL(media.url, "http://localhost:3001").href,
            id: `${media.id || index}-${Date.now()}`, // Ensure unique keys
          }));
          
          setMediaFiles(mediaFilesWithAbsoluteUrls);
          
          // Preload first few items immediately
          mediaFilesWithAbsoluteUrls.slice(0, 3).forEach(media => preloadMedia(media));
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadMedia();
    }
  }, [projectId, preloadMedia]);

  // Auto-advance timer with smooth pause/resume
  useEffect(() => {
    if (mediaFiles.length > 1 && !isPaused && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 6000); // 6 seconds for optimal viewing
      
      return () => clearInterval(intervalRef.current);
    }
  }, [mediaFiles.length, isPaused, currentIndex, isTransitioning]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isTransitioning) return; // Prevent rapid transitions

      switch (event.key) {
        case "Escape":
          if (isFullScreen) exitFullscreen();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          togglePause();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          handlePrevious();
          break;
        case "f":
        case "F":
          event.preventDefault();
          toggleFullscreen();
          break;
        case "r":
        case "R":
          event.preventDefault();
          // Random transition preview
          setTransitionIndex(selectTransition());
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullScreen, isPaused, isTransitioning]);

  // Smooth transition handlers
  const handleNext = useCallback(() => {
    if (isTransitioning || mediaFiles.length <= 1) return;
    
    setIsTransitioning(true);
    setTransitionDirection('forward');
    setTransitionIndex(selectTransition());
    
    const nextIndex = (currentIndex + 1) % mediaFiles.length;
    setCurrentIndex(nextIndex);
    
    // Reset transition lock after animation completes
    clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [currentIndex, mediaFiles.length, isTransitioning, selectTransition]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning || mediaFiles.length <= 1) return;
    
    setIsTransitioning(true);
    setTransitionDirection('backward');
    setTransitionIndex(selectTransition());
    
    const prevIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    setCurrentIndex(prevIndex);
    
    clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [currentIndex, mediaFiles.length, isTransitioning, selectTransition]);

  // Fullscreen management
  const toggleFullscreen = useCallback(() => {
    if (!isFullScreen && screenSaverRef.current) {
      screenSaverRef.current.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch(console.error);
    } else if (isFullScreen) {
      exitFullscreen();
    }
  }, [isFullScreen]);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch(console.error);
    } else {
      setIsFullScreen(false);
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Mouse/touch controls with debouncing
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleInteraction = useCallback((event) => {
    if (isTransitioning) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const zone = x / width;

    if (zone < 0.25) {
      handlePrevious();
    } else if (zone > 0.75) {
      handleNext();
    } else {
      togglePause();
    }
  }, [handleNext, handlePrevious, togglePause, isTransitioning]);

  // Gesture support for touch devices
  const bind = useDrag(
    ({ direction: [dx], velocity: [vx], down, cancel }) => {
      if (isTransitioning) {
        cancel();
        return;
      }
      if (!down && Math.abs(vx) > 0.5) {
        if (dx > 0) {
          handlePrevious();
        } else {
          handleNext();
        }
      }
    },
    { axis: 'x', threshold: 50 }
  );

  const currentMedia = mediaFiles[currentIndex];
  const currentTransition = smoothTransitions[transitionIndex];
  
  const transitions = useTransition(currentMedia, {
    ...currentTransition,
    keys: currentMedia?.id || currentMedia?.url,
    onStart: () => setIsTransitioning(true),
    onRest: () => setIsTransitioning(false),
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 rounded-2xl">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-400 opacity-20"></div>
          </div>
          <p className="text-white text-xl font-medium">Loading media...</p>
          <p className="text-gray-400 text-sm mt-2">Preparing your visual experience</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (mediaFiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-white text-xl font-medium">No media available</p>
          <p className="text-gray-400 text-sm mt-2">Add some images or videos to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Enhanced Control Panel */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleFullscreen}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
          >
            {isFullScreen ? '🔲 Exit Fullscreen' : '⛶ Enter Fullscreen'}
          </button>
          
          <div className="flex items-center space-x-2 text-white">
            <span className="text-sm bg-slate-600 px-2 py-1 rounded">
              {currentTransition?.name || 'Transition'}
            </span>
            <span className="text-xs text-slate-300">
              {currentIndex + 1}/{mediaFiles.length}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPaused 
              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
              : 'bg-green-500/20 text-green-300 border border-green-500/30'
          }`}>
            {isPaused ? '⏸ Paused' : '▶ Playing'}
          </div>
          
          <div className={`px-2 py-1 rounded text-xs ${
            isTransitioning 
              ? 'bg-yellow-500/20 text-yellow-300' 
              : 'bg-slate-600 text-slate-300'
          }`}>
            {isTransitioning ? '🔄' : '✓'}
          </div>
        </div>
      </div>

      {/* Enhanced Screensaver Container */}
      <div
        ref={screenSaverRef}
        className={`relative overflow-hidden cursor-pointer select-none transition-all duration-500 ${
          isFullScreen 
            ? 'fixed inset-0 z-50' 
            : 'w-full h-[60vh] lg:h-[70vh] rounded-2xl shadow-2xl'
        } bg-black`}
        onClick={handleInteraction}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
        {...bind()}
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Media Transitions with Enhanced Rendering */}
        {transitions((style, item) =>
          item ? (
            <animated.div
              style={style}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              {item.content_type?.startsWith("video") ? (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[item.url] = el;
                  }}
                  src={item.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover will-change-transform"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)' // Force GPU acceleration
                  }}
                  onLoadedData={() => {
                    console.log("Video loaded:", item.url);
                    const video = videoRefs.current[item.url];
                    if (video && isPaused) video.pause();
                    else if (video && !isPaused) video.play();
                  }}
                  onError={(e) => console.error("Video error:", item.url, e)}
                />
              ) : (
                <img
                  src={item.url}
                  alt="Screensaver media"
                  className="w-full h-full object-cover will-change-transform"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)' // Force GPU acceleration
                  }}
                  onError={(e) => console.error("Image error:", item.url, e)}
                />
              )}
            </animated.div>
          ) : null
        )}

        {/* Enhanced Animated Logo */}
        <animated.img
          style={logoSpring}
          src={logo}
          alt="Logo"
          className="absolute bottom-6 right-6 w-24 h-20 pointer-events-none z-20 will-change-transform"
        />

        {/* Sophisticated Controls Overlay */}
        <animated.div
          style={controlsSpring}
          className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        >
          <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            <div className="flex items-end justify-between text-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-red-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
                  <span className="text-sm font-medium">
                    {currentIndex + 1} of {mediaFiles.length}
                  </span>
                  <div className="h-4 w-px bg-white/30"></div>
                  <span className="text-xs text-gray-300 font-mono">
                    {currentTransition?.name}
                  </span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out rounded-full"
                    style={{ 
                      width: `${((currentIndex + 1) / mediaFiles.length) * 100}%` 
                    }}
                  >
                    <div className="h-full bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-300 space-y-1">
                  <p>← → Navigate • Space Pause • F Fullscreen</p>
                  <p>R Random transition • Click zones to control</p>
                </div>
              </div>
            </div>
          </div>
        </animated.div>

        {/* Interactive Navigation Zones with Visual Feedback */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1 group">
            <div className="h-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 flex items-center justify-start pl-8">
              <div className="text-white/0 group-hover:text-white/60 text-5xl transition-all duration-300 transform group-hover:scale-110">
                ‹
              </div>
            </div>
          </div>
          
          <div className="flex-1 group">
            <div className="h-full bg-transparent group-hover:bg-white/5 transition-all duration-300 flex items-center justify-center">
              <div className="text-white/0 group-hover:text-white/60 text-4xl transition-all duration-300 transform group-hover:scale-110">
                {isPaused ? '▶' : '⏸'}
              </div>
            </div>
          </div>
          
          <div className="flex-1 group">
            <div className="h-full bg-transparent group-hover:bg-gradient-to-l group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 flex items-center justify-end pr-8">
              <div className="text-white/0 group-hover:text-white/60 text-5xl transition-all duration-300 transform group-hover:scale-110">
                ›
              </div>
            </div>
          </div>
        </div>

        {/* Transition Loading Indicator */}
        {isTransitioning && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Transitioning...</span>
            </div>
          </div>
        )}

        {/* Transition Loading Indicator */}
        {isTransitioning && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Transitioning...</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Instructions */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="space-y-1">
            <div className="text-blue-400 font-medium">🖱️ Mouse Controls</div>
            <p>Left zone: Previous • Center: Pause/Play • Right zone: Next</p>
          </div>
          <div/>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / mediaFiles.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
        <p>🖱️ Click left/right sides to navigate • Center to pause/play</p>
        <p>⌨️ Use arrow keys, spacebar, F for fullscreen, ESC to exit</p>
        <p>🎨 Transitions change automatically for variety</p>
      </div>
    </div>
    </div>

  );
};

export default ScreenSaver;