// import { useTransition, animated } from "@react-spring/web";
// import { fetchMedia } from "../services/api";
// import { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// const ScreenSaver = ({ projectId }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(true);
//   const screenSaverRef = useRef(null);
//   const videoRefs = useRef({});

//   const transitionEffects = [
//     {
//       from: { opacity: 0, transform: "scale(1.2)" },
//       enter: { opacity: 1, transform: "scale(1)" },
//       leave: { opacity: 0, transform: "scale(0.8)" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "translateX(100%)" },
//       enter: { opacity: 1, transform: "translateX(0%)" },
//       leave: { opacity: 0, transform: "translateX(-100%)" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "translateY(-100%)" },
//       enter: { opacity: 1, transform: "translateY(0%)" },
//       leave: { opacity: 0, transform: "translateY(100%)" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "rotate(180deg)" },
//       enter: { opacity: 1, transform: "rotate(0deg)" },
//       leave: { opacity: 0, transform: "rotate(-180deg)" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "scaleX(0.8)", transformOrigin: "left" },
//       enter: { opacity: 1, transform: "scaleX(1)", transformOrigin: "left" },
//       leave: { opacity: 0, transform: "scaleX(0.8)", transformOrigin: "left" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "scaleY(0.8)", transformOrigin: "bottom" },
//       enter: { opacity: 1, transform: "scaleY(1)", transformOrigin: "bottom" },
//       leave: {
//         opacity: 0,
//         transform: "scaleY(0.8)",
//         transformOrigin: "bottom",
//       },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "skewX(15deg)" },
//       enter: { opacity: 1, transform: "skewX(0deg)" },
//       leave: { opacity: 0, transform: "skewX(-15deg)" },
//       config: { tension: 200, friction: 20 },
//     },
//     {
//       from: { opacity: 0, transform: "rotateY(90deg)" },
//       enter: { opacity: 1, transform: "rotateY(0deg)" },
//       leave: { opacity: 0, transform: "rotateY(-90deg)" },
//       config: { tension: 200, friction: 20 },
//     },
//   ];

//   const [transitionIndex, setTransitionIndex] = useState(0);

//   useEffect(() => {
//     const loadMedia = async () => {
//       try {
//         const response = await fetchMedia(projectId);
//         if (response.media_files) {
//           const mediaFilesWithAbsoluteUrls = response.media_files.map(
//             (media) => ({
//               ...media,
//               url: new URL(media.url, "https://gallery-db.onrender.com").href,
//             })
//           );
//           setMediaFiles(mediaFilesWithAbsoluteUrls);
//           console.log("Loaded media files:", mediaFilesWithAbsoluteUrls);
//         } else {
//           console.error("Invalid response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching media:", error.message);
//       }
//     };

//     loadMedia();
//   }, [projectId]);

//   useEffect(() => {
//     if (mediaFiles.length > 1) {
//       const interval = setInterval(() => {
//         const currentVideo = videoRefs.current[mediaFiles[currentIndex]?.url];
//         if (currentVideo && !currentVideo.paused) {
//           currentVideo.play();
//         } else {
//           handleNext();
//         }
//       }, 30000); // Change images/videos every 30 seconds

//       return () => clearInterval(interval);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mediaFiles, currentIndex]);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "Escape" && isFullScreen) {
//         setIsFullScreen(false);
//         if (document.fullscreenElement) {
//           document.exitFullscreen();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [isFullScreen]);

//   useEffect(() => {
//     if (isFullScreen && screenSaverRef.current) {
//       screenSaverRef.current.requestFullscreen().catch((err) => {
//         console.error("Failed to enter full-screen mode:", err);
//       });
//     }
//   }, [isFullScreen]);

//   const transitions = useTransition(mediaFiles[currentIndex], {
//     ...transitionEffects[transitionIndex],
//     config: { duration: 1000 }, // Adjusted duration for smoother transitions
//     keys: mediaFiles[currentIndex]?.url,
//   });

//   const handleNext = () => {
//     setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
//     console.log(
//       "Next media:",
//       mediaFiles[(currentIndex + 1) % mediaFiles.length]
//     );
//   };

//   const handlePrevious = () => {
//     setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + mediaFiles.length) % mediaFiles.length
//     );
//     console.log(
//       "Previous media:",
//       mediaFiles[(currentIndex - 1 + mediaFiles.length) % mediaFiles.length]
//     );
//   };

//   return (
//     <div ref={screenSaverRef} className="relative w-full h-full">
//       {transitions((style, item) => (
//         <animated.div
//           style={{
//             ...style,
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           {item &&
//           item.content_type &&
//           item.content_type.startsWith("video") ? (
//             <video
//               ref={(el) => (videoRefs.current[item.url] = el)}
//               src={item.url}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="object-cover w-full h-full"
//             />
//           ) : (
//             item && (
//               <img
//                 src={item.url}
//                 alt="Screensaver"
//                 className="object-cover w-full h-full"
//               />
//             )
//           )}
//         </animated.div>
//       ))}
//       <button
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//         onClick={handlePrevious}
//       >
//         <FontAwesomeIcon icon={faArrowLeft} size="lg" />
//       </button>
//       <button
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//         onClick={handleNext}
//       >
//         <FontAwesomeIcon icon={faArrowRight} size="lg" />
//       </button>
//     </div>
//   );
// };

// export default ScreenSaver;import { useTransition, animated } from "@react-spring/web";
import { fetchMedia } from "../services/api";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "@react-spring/web";

const ScreenSaver = ({ projectId }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false); // Track if media is loaded
  const screenSaverRef = useRef(null);
  const videoRefs = useRef({});

  // Define a variety of transition effects
  const transitionEffects = [
    {
      from: { opacity: 0, transform: "scale(1.2)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.8)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "translateX(100%)" },
      enter: { opacity: 1, transform: "translateX(0%)" },
      leave: { opacity: 0, transform: "translateX(-100%)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "translateY(-100%)" },
      enter: { opacity: 1, transform: "translateY(0%)" },
      leave: { opacity: 0, transform: "translateY(100%)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "rotate(180deg)" },
      enter: { opacity: 1, transform: "rotate(0deg)" },
      leave: { opacity: 0, transform: "rotate(-180deg)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "scaleX(0.8)", transformOrigin: "left" },
      enter: { opacity: 1, transform: "scaleX(1)", transformOrigin: "left" },
      leave: { opacity: 0, transform: "scaleX(0.8)", transformOrigin: "left" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "scaleY(0.8)", transformOrigin: "bottom" },
      enter: { opacity: 1, transform: "scaleY(1)", transformOrigin: "bottom" },
      leave: {
        opacity: 0,
        transform: "scaleY(0.8)",
        transformOrigin: "bottom",
      },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "skewX(15deg)" },
      enter: { opacity: 1, transform: "skewX(0deg)" },
      leave: { opacity: 0, transform: "skewX(-15deg)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "rotateY(90deg)" },
      enter: { opacity: 1, transform: "rotateY(0deg)" },
      leave: { opacity: 0, transform: "rotateY(-90deg)" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "scale(0.5)", rotateZ: "45deg" },
      enter: { opacity: 1, transform: "scale(1)", rotateZ: "0deg" },
      leave: { opacity: 0, transform: "scale(0.5)", rotateZ: "45deg" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "translateX(100%)", skewX: "30deg" },
      enter: { opacity: 1, transform: "translateX(0%)", skewX: "0deg" },
      leave: { opacity: 0, transform: "translateX(-100%)", skewX: "-30deg" },
      config: { tension: 200, friction: 20 },
    },
    {
      from: { opacity: 0, transform: "scaleY(0.5)" },
      enter: { opacity: 1, transform: "scaleY(1)" },
      leave: { opacity: 0, transform: "scaleY(0.5)" },
      config: { tension: 200, friction: 20 },
    },
  ];

  const [transitionIndex, setTransitionIndex] = useState(0);

  // Fetch media files
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetchMedia(projectId);
        if (response.media_files) {
          const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
            ...media,
            url: new URL(media.url, "https://gallery-db.onrender.com").href,
          }));
          setMediaFiles(mediaFilesWithAbsoluteUrls);
          setIsLoaded(true); // Mark media as loaded
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching media:", error.message);
      }
    };

    loadMedia();
  }, [projectId]);

  // Handle media switching
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaFiles, currentIndex]);

  // Handle fullscreen mode
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullScreen]);

  useEffect(() => {
    if (isFullScreen && screenSaverRef.current) {
      screenSaverRef.current.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen mode:", err);
      });
    }
  }, [isFullScreen]);

  const transitions = useTransition(mediaFiles[currentIndex], {
    ...transitionEffects[transitionIndex],
    config: { duration: 1000 }, // Adjusted duration for smoother transitions
    keys: mediaFiles[currentIndex]?.url,
  });

  const handleNext = () => {
    setTransitionIndex((prevIndex) => (prevIndex + 1) % transitionEffects.length);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
  };

  const handlePrevious = () => {
    setTransitionIndex((prevIndex) => (prevIndex - 1 + transitionEffects.length) % transitionEffects.length);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mediaFiles.length) % mediaFiles.length
    );
  };

  return (
    <div ref={screenSaverRef} className="relative w-full h-full bg-black">
      {isLoaded ? (
        transitions((style, item) => (
          <animated.div
            style={{
              ...style,
              position: "absolute",
              width: "100%",
              height: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item &&
            item.content_type &&
            item.content_type.startsWith("video") ? (
              <video
                ref={(el) => (videoRefs.current[item.url] = el)}
                src={item.url}
                autoPlay
                muted
                loop
                playsInline
                className="object-cover w-full h-full"
                loading="lazy"
              />
            ) : (
              item && (
                <img
                  src={item.url}
                  alt="Screensaver"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )
            )}
          </animated.div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading...
        </div>
      )}
      <button
        aria-label="Previous"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={handlePrevious}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        aria-label="Next"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default ScreenSaver;
