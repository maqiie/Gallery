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
//               url: new URL(media.url, "http://localhost:3001").href,
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
  const [loading, setLoading] = useState(true);
  const screenSaverRef = useRef(null);
  const videoRefs = useRef({});
  const preloadRef = useRef({});

  // Transition effects with smooth modern animations
  const transitionEffects = [
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
    {
      from: { opacity: 0, transform: 'translateY(100%)' },
      enter: { opacity: 1, transform: 'translateY(0%)' },
      leave: { opacity: 0, transform: 'translateY(-100%)' },
    },
    {
      from: { opacity: 0, transform: 'scale(0.8)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(1.2)' },
    },
    {
      from: { opacity: 0, transform: 'rotateX(90deg)' },
      enter: { opacity: 1, transform: 'rotateX(0deg)' },
      leave: { opacity: 0, transform: 'rotateX(-90deg)' },
    },
    {
      from: { opacity: 0, transform: 'rotateY(90deg)' },
      enter: { opacity: 1, transform: 'rotateY(0deg)' },
      leave: { opacity: 0, transform: 'rotateY(-90deg)' },
    },
  ];

  const [transitionIndex, setTransitionIndex] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetchMedia(projectId);
        if (response.media_files) {
          const mediaFilesWithAbsoluteUrls = response.media_files.map(
            (media) => ({
              ...media,
              url: new URL(media.url, "https://gallery-db.onrender.com").href,
            })
          );
          setMediaFiles(mediaFilesWithAbsoluteUrls);
          console.log("Loaded media files:", mediaFilesWithAbsoluteUrls);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching media:", error.message);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaFiles, currentIndex]);

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

  // Preload and lazy load media
  const preloadNextMedia = (nextIndex) => {
    const nextMedia = mediaFiles[nextIndex];
    if (nextMedia) {
      const mediaType = nextMedia.content_type || "";
      const mediaElement =
        mediaType.startsWith("video")
          ? document.createElement("video")
          : document.createElement("img");

      mediaElement.src = nextMedia.url;
      mediaElement.onload = () => {
        preloadRef.current[nextMedia.url] = mediaElement;
        if (nextIndex === (currentIndex + 1) % mediaFiles.length) {
          setLoading(false);
        }
      };
      mediaElement.onerror = () => {
        console.error("Failed to preload media:", nextMedia.url);
        setLoading(false);
      };
    } else {
      console.error("Invalid media at index:", nextIndex, nextMedia);
    }
  };

  const handleNext = () => {
    setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
    const nextIndex = (currentIndex + 1) % mediaFiles.length;
    preloadNextMedia((nextIndex + 1) % mediaFiles.length);
    setCurrentIndex(nextIndex);
    setLoading(true);
    console.log("Next media:", mediaFiles[nextIndex]);
  };

  const handlePrevious = () => {
    setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
    const prevIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    preloadNextMedia((prevIndex - 1 + mediaFiles.length) % mediaFiles.length);
    setCurrentIndex(prevIndex);
    setLoading(true);
    console.log("Previous media:", mediaFiles[prevIndex]);
  };

  const currentMedia = mediaFiles[currentIndex];

  const transitions = useTransition(currentMedia, {
    ...transitionEffects[transitionIndex],
    config: { tension: 300, friction: 30 }, // Enhanced spring configuration
    keys: currentMedia?.url,
  });

  return (
    <div ref={screenSaverRef} className="relative w-full h-full overflow-hidden">
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform, opacity', // Optimize for animations
            backgroundColor: loading ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Fade background while loading
          }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
            </div>
          )}
          {item && item.content_type && item.content_type.startsWith("video") ? (
            <video
              ref={(el) => (videoRefs.current[item.url] = el)}
              src={item.url}
              autoPlay
              muted
              loop
              playsInline
              className={`object-cover w-full h-full ${loading ? "hidden" : ""}`}
              onLoadedData={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          ) : (
            item && (
              <img
                src={item.url}
                alt="Screensaver"
                className={`object-cover w-full h-full ${loading ? "hidden" : ""}`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            )
          )}
        </animated.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handlePrevious}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
      <style jsx>{`
        .newtons-cradle {
          --uib-size: 50px;
          --uib-speed: 1.2s;
          --uib-color: #474554;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--uib-size);
          height: var(--uib-size);
        }

        .newtons-cradle__dot {
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
          width: 25%;
          transform-origin: center top;
        }

        .newtons-cradle__dot::after {
          content: '';
          display: block;
          width: 100%;
          height: 25%;
          border-radius: 50%;
          background-color: var(--uib-color);
        }

        .newtons-cradle__dot:first-child {
          animation: swing var(--uib-speed) linear infinite;
        }

        .newtons-cradle__dot:last-child {
          animation: swing2 var(--uib-speed) linear infinite;
        }

        @keyframes swing {
          0% {
            transform: rotate(0deg);
            animation-timing-function: ease-out;
          }

          25% {
            transform: rotate(70deg);
            animation-timing-function: ease-in;
          }

          50% {
            transform: rotate(0deg);
            animation-timing-function: linear;
          }
        }

        @keyframes swing2 {
          0% {
            transform: rotate(0deg);
            animation-timing-function: linear;
          }

          50% {
            transform: rotate(0deg);
            animation-timing-function: ease-out;
          }

          75% {
            transform: rotate(-70deg);
            animation-timing-function: ease-in;
          }
        }
      `}</style>
    </div>
  );
};

export default ScreenSaver;
