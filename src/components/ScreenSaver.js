
// import React, { useState, useEffect, useRef } from 'react';
// import { useTransition, animated } from '@react-spring/web';
// import { fetchMedia } from '../services/api';

// const ScreenSaver = ({ projectId }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false); // Start not in full-screen mode
//   const screenSaverRef = useRef(null); // Ref to the container

//   const transitionEffects = [
//     {
//       from: { opacity: 0, transform: 'scale(1.2)' },
//       enter: { opacity: 1, transform: 'scale(1)' },
//       leave: { opacity: 0, transform: 'scale(0.8)' },
//       config: { tension: 170, friction: 26 },
//     },
//     // Add other transition effects here...
//   ];

//   const [transitionIndex, setTransitionIndex] = useState(0);

//   useEffect(() => {
//     const loadMedia = async () => {
//       try {
//         const response = await fetchMedia(projectId);
//         if (response.media_files) {
//           const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
//             ...media,
//             url: new URL(media.url, 'http://localhost:3001').href, // Adjust the base URL as needed
//           }));
//           setMediaFiles(mediaFilesWithAbsoluteUrls);
//         } else {
//           console.error('Invalid response format:', response);
//         }
//       } catch (error) {
//         console.error('Error fetching media:', error.message);
//       }
//     };

//     loadMedia();
//   }, [projectId]);

//   useEffect(() => {
//     if (mediaFiles.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
//         setTransitionIndex(Math.floor(Math.random() * transitionEffects.length)); // Randomize transition effect
//       }, 10000); // Change images every 10 seconds

//       return () => clearInterval(interval);
//     }
//   }, [mediaFiles]);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'Escape') {
//         setIsFullScreen(false);
//         document.exitFullscreen(); // Exit full-screen mode
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   useEffect(() => {
//     if (isFullScreen && screenSaverRef.current) {
//       screenSaverRef.current.requestFullscreen(); // Request full-screen mode
//     }
//   }, [isFullScreen]);

//   const transitions = useTransition(mediaFiles[currentIndex], {
//     ...transitionEffects[transitionIndex],
//     config: { duration: 1000 },
//   });

//   const renderMedia = (media) => {
//     if (media.url.match(/\.(mp4|webm|ogg)$/i)) {
//       return (
//         <video
//           key={media.url}
//           src={media.url}
//           className="w-full h-full object-cover"
//           autoPlay
//           loop
//           muted
//         />
//       );
//     }

//     return (
//       <img
//         key={media.url}
//         src={media.url}
//         alt={media.filename}
//         className="w-full h-full object-cover"
//       />
//     );
//   };

//   useEffect(() => {
//     // Request full-screen mode on component mount
//     if (!isFullScreen) {
//       setIsFullScreen(true);
//     }
//   }, []);

//   if (!isFullScreen) {
//     return null; // Exit full-screen mode
//   }

//   return (
//     <div
//       ref={screenSaverRef}
//       className="fixed inset-0 z-50 bg-black flex justify-center items-center overflow-hidden"
//     >
//       {transitions((style, media) => (
//         <animated.div
//           style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}
//         >
//           {renderMedia(media)}
//         </animated.div>
//       ))}
//     </div>
//   );
// };

// // export default ScreenSaver;
// import React, { useState, useEffect, useRef } from 'react';
// import { useTransition, animated } from '@react-spring/web';
// import { fetchMedia } from '../services/api';

// const ScreenSaver = ({ projectId }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(true);
//   const screenSaverRef = useRef(null);

//   const transitionEffects = [
//     {
//       from: { opacity: 0, transform: 'scale(1.5)' },
//       enter: { opacity: 1, transform: 'scale(1)' },
//       leave: { opacity: 0, transform: 'scale(0.5)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateX(100%)' },
//       enter: { opacity: 1, transform: 'translateX(0%)' },
//       leave: { opacity: 0, transform: 'translateX(-100%)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'rotate(180deg)' },
//       enter: { opacity: 1, transform: 'rotate(0deg)' },
//       leave: { opacity: 0, transform: 'rotate(-180deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateY(-50%) rotateX(45deg)' },
//       enter: { opacity: 1, transform: 'translateY(0%) rotateX(0deg)' },
//       leave: { opacity: 0, transform: 'translateY(50%) rotateX(-45deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'scale(0.9) rotateY(90deg)' },
//       enter: { opacity: 1, transform: 'scale(1) rotateY(0deg)' },
//       leave: { opacity: 0, transform: 'scale(0.9) rotateY(-90deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//   ];

//   const [transitionIndex, setTransitionIndex] = useState(0);

//   useEffect(() => {
//     const loadMedia = async () => {
//       try {
//         const response = await fetchMedia(projectId);
//         if (response.media_files) {
//           const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
//             ...media,
//             url: new URL(media.url, 'http://localhost:3001').href,
//           }));
//           setMediaFiles(mediaFilesWithAbsoluteUrls);
//         } else {
//           console.error('Invalid response format:', response);
//         }
//       } catch (error) {
//         console.error('Error fetching media:', error.message);
//       }
//     };

//     loadMedia();
//   }, [projectId]);

//   useEffect(() => {
//     if (mediaFiles.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
//         setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//       }, 10000); // Change images/videos every 10 seconds

//       return () => clearInterval(interval);
//     }
//   }, [mediaFiles]);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'Escape') {
//         setIsFullScreen(false);
//         document.exitFullscreen();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   useEffect(() => {
//     if (isFullScreen && screenSaverRef.current) {
//       screenSaverRef.current.requestFullscreen();
//     }
//   }, [isFullScreen]);

//   useEffect(() => {
//     if (!isFullScreen) {
//       setIsFullScreen(true);
//     }
//   }, []);

//   const transitions = useTransition(mediaFiles[currentIndex], {
//     ...transitionEffects[transitionIndex],
//     config: { duration: 1500 }, // Adjusted duration for smooth transitions
//   });

//   const renderMedia = (media) => {
//     if (media.url.match(/\.(mp4|webm|ogg)$/i)) {
//       return (
//         <video
//           key={media.url}
//           src={media.url}
//           className="w-full h-full object-cover"
//           autoPlay
//           loop
//           controls={false} // Hide controls for full screen
//         />
//       );
//     }

//     return (
//       <img
//         key={media.url}
//         src={media.url}
//         alt={media.filename}
//         className="w-full h-full object-cover"
//       />
//     );
//   };

//   if (!isFullScreen) {
//     return null;
//   }

//   return (
//     <div
//       ref={screenSaverRef}
//       className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
//     >
//       {transitions((style, media) => (
//         <animated.div
//           style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}
//           className="flex items-center justify-center"
//         >
//           {renderMedia(media)}
//         </animated.div>
//       ))}
//     </div>
//   );
// };

// // export default ScreenSaver;import React, { useState, useEffect, useRef } from 'react';
// import { useTransition, animated } from '@react-spring/web';
// import { fetchMedia } from '../services/api';
// import { useState,useEffect,useRef } from 'react';

// const ScreenSaver = ({ projectId }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(true);
//   const screenSaverRef = useRef(null);
//   const videoRefs = useRef({}); // Ref to hold video elements

//   const transitionEffects = [
//     // Existing Effects
//     {
//       from: { opacity: 0, transform: 'scale(1.5)' },
//       enter: { opacity: 1, transform: 'scale(1)' },
//       leave: { opacity: 0, transform: 'scale(0.5)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateX(100%)' },
//       enter: { opacity: 1, transform: 'translateX(0%)' },
//       leave: { opacity: 0, transform: 'translateX(-100%)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'rotate(180deg)' },
//       enter: { opacity: 1, transform: 'rotate(0deg)' },
//       leave: { opacity: 0, transform: 'rotate(-180deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateY(-50%) rotateX(45deg)' },
//       enter: { opacity: 1, transform: 'translateY(0%) rotateX(0deg)' },
//       leave: { opacity: 0, transform: 'translateY(50%) rotateX(-45deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'scale(0.9) rotateY(90deg)' },
//       enter: { opacity: 1, transform: 'scale(1) rotateY(0deg)' },
//       leave: { opacity: 0, transform: 'scale(0.9) rotateY(-90deg)' },
//       config: { tension: 200, friction: 20 },
//     },
  
//     // New Effects
//     {
//       from: { opacity: 0, transform: 'translateY(100%)' },
//       enter: { opacity: 1, transform: 'translateY(0%)' },
//       leave: { opacity: 0, transform: 'translateY(-100%)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'skewX(-30deg)' },
//       enter: { opacity: 1, transform: 'skewX(0deg)' },
//       leave: { opacity: 0, transform: 'skewX(30deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'scale(0.8) translateY(50%)' },
//       enter: { opacity: 1, transform: 'scale(1) translateY(0%)' },
//       leave: { opacity: 0, transform: 'scale(0.8) translateY(-50%)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'rotateX(90deg)' },
//       enter: { opacity: 1, transform: 'rotateX(0deg)' },
//       leave: { opacity: 0, transform: 'rotateX(-90deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'scale(0.8) rotateZ(45deg)' },
//       enter: { opacity: 1, transform: 'scale(1) rotateZ(0deg)' },
//       leave: { opacity: 0, transform: 'scale(0.8) rotateZ(-45deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateX(-50%) scaleY(0.5)' },
//       enter: { opacity: 1, transform: 'translateX(0%) scaleY(1)' },
//       leave: { opacity: 0, transform: 'translateX(50%) scaleY(0.5)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'scaleY(0.8)' },
//       enter: { opacity: 1, transform: 'scaleY(1)' },
//       leave: { opacity: 0, transform: 'scaleY(0.8)' },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: 'translateZ(-500px) rotateY(180deg)' },
//       enter: { opacity: 1, transform: 'translateZ(0px) rotateY(0deg)' },
//       leave: { opacity: 0, transform: 'translateZ(500px) rotateY(-180deg)' },
//       config: { tension: 200, friction: 20 },
//     },
//   ];
  

//   const [transitionIndex, setTransitionIndex] = useState(0);

//   useEffect(() => {
//     const loadMedia = async () => {
//       try {
//         const response = await fetchMedia(projectId);
//         if (response.media_files) {
//           const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
//             ...media,
//             url: new URL(media.url, 'http://localhost:3001').href,
//           }));
//           setMediaFiles(mediaFilesWithAbsoluteUrls);
//         } else {
//           console.error('Invalid response format:', response);
//         }
//       } catch (error) {
//         console.error('Error fetching media:', error.message);
//       }
//     };

//     loadMedia();
//   }, [projectId]);

//   useEffect(() => {
//     if (mediaFiles.length > 1) {
//       const interval = setInterval(() => {
//         const currentVideo = videoRefs.current[mediaFiles[currentIndex]?.url];
//         if (currentVideo && currentVideo.paused) {
//           setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
//           setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//         } else {
//           // Transition only when the video is not playing
//           setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
//           setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//         }
//       }, 30000); // Change images/videos every 10 seconds

//       return () => clearInterval(interval);
//     }
//   }, [mediaFiles, currentIndex]);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'Escape') {
//         setIsFullScreen(false);
//         document.exitFullscreen();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   useEffect(() => {
//     if (isFullScreen && screenSaverRef.current) {
//       screenSaverRef.current.requestFullscreen();
//     }
//   }, [isFullScreen]);

//   useEffect(() => {
//     if (!isFullScreen) {
//       setIsFullScreen(true);
//     }
//   }, []);

//   const transitions = useTransition(mediaFiles[currentIndex], {
//     ...transitionEffects[transitionIndex],
//     config: { duration: 1500 },
//   });

//   const renderMedia = (media) => {
//     if (media.url.match(/\.(mp4|webm|ogg)$/i)) {
//       return (
//         <video
//           key={media.url}
//           src={media.url}
//           ref={(el) => (videoRefs.current[media.url] = el)}
//           className="w-full h-full object-cover"
//           autoPlay
//           loop
//           muted={false} // Enable audio
//           onEnded={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length)}
//         />
//       );
//     }

//     return (
//       <img
//         key={media.url}
//         src={media.url}
//         alt={media.filename}
//         className="w-full h-full object-cover"
//       />
//     );
//   };

//   if (!isFullScreen) {
//     return null;
//   }

//   return (
//     <div
//       ref={screenSaverRef}
//       className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
//     >
//       {transitions((style, media) => (
//         <animated.div
//           style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}
//           className="flex items-center justify-center"
//         >
//           {renderMedia(media)}
//         </animated.div>
//       ))}
//     </div>
//   );
// };

// export default ScreenSaver;
import { useTransition, animated } from '@react-spring/web';
import { fetchMedia } from '../services/api';
import { useState, useEffect, useRef } from 'react';

const ScreenSaver = ({ projectId }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const screenSaverRef = useRef(null);
  const videoRefs = useRef({});

  const transitionEffects = [
    {
      from: { opacity: 0, transform: 'scale(1.2)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.8)' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'translateX(100%)' },
      enter: { opacity: 1, transform: 'translateX(0%)' },
      leave: { opacity: 0, transform: 'translateX(-100%)' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'translateY(-100%)' },
      enter: { opacity: 1, transform: 'translateY(0%)' },
      leave: { opacity: 0, transform: 'translateY(100%)' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'rotate(180deg)' },
      enter: { opacity: 1, transform: 'rotate(0deg)' },
      leave: { opacity: 0, transform: 'rotate(-180deg)' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'scaleX(0.8)', transformOrigin: 'left' },
      enter: { opacity: 1, transform: 'scaleX(1)', transformOrigin: 'left' },
      leave: { opacity: 0, transform: 'scaleX(0.8)', transformOrigin: 'left' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'scaleY(0.8)', transformOrigin: 'bottom' },
      enter: { opacity: 1, transform: 'scaleY(1)', transformOrigin: 'bottom' },
      leave: { opacity: 0, transform: 'scaleY(0.8)', transformOrigin: 'bottom' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'skewX(15deg)' },
      enter: { opacity: 1, transform: 'skewX(0deg)' },
      leave: { opacity: 0, transform: 'skewX(-15deg)' },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: 'rotateY(90deg)' },
      enter: { opacity: 1, transform: 'rotateY(0deg)' },
      leave: { opacity: 0, transform: 'rotateY(-90deg)' },
      config: { tension: 200, friction: 20 },
    },
  ];

  const [transitionIndex, setTransitionIndex] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetchMedia(projectId);
        if (response.media_files) {
          const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
            ...media,
            url: new URL(media.url, 'http://localhost:3001').href,
          }));
          setMediaFiles(mediaFilesWithAbsoluteUrls);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching media:', error.message);
      }
    };

    loadMedia();
  }, [projectId]);

  useEffect(() => {
    if (mediaFiles.length > 1) {
      const interval = setInterval(() => {
        const currentVideo = videoRefs.current[mediaFiles[currentIndex]?.url];
        if (currentVideo && !currentVideo.paused) {
          currentVideo.play();
        } else {
          handleNext();
        }
      }, 30000); // Change images/videos every 30 seconds

      return () => clearInterval(interval);
    }
  }, [mediaFiles, currentIndex]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
        document.exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (isFullScreen && screenSaverRef.current) {
      screenSaverRef.current.requestFullscreen();
    }
  }, [isFullScreen]);

  useEffect(() => {
    if (!isFullScreen) {
      setIsFullScreen(true);
    }
  }, []);

  const transitions = useTransition(mediaFiles[currentIndex], {
    ...transitionEffects[transitionIndex],
    config: { duration: 1000 }, // Adjusted duration for smoother transitions
    keys: mediaFiles[currentIndex]?.url,
  });

  const handleNext = () => {
    setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
  };

  const handlePrevious = () => {
    setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div ref={screenSaverRef} className="relative w-full h-full">
      {transitions((style, item) => (
        <animated.div style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}>
         {item && item.content_type && item.content_type.startsWith('video') ? (
  <video
    ref={(el) => (videoRefs.current[item.url] = el)}
    src={item.url}
    autoPlay
    muted
    loop
    playsInline
    className="object-cover w-full h-full"
  />
) : (
  item && (
    <img
      src={item.url}
      alt="Screensaver"
      className="object-cover w-full h-full"
    />
  )
)}

        </animated.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};


export default ScreenSaver;
