// import { fetchMedia } from "../services/api";
// import { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useTransition, animated } from "@react-spring/web";

// const ScreenSaver = ({ projectId }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const screenSaverRef = useRef(null);
//   const videoRefs = useRef({});
//   const preloadRef = useRef({});
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
//         handleNext();
//       }, 30000); // Change media every 30 seconds

//       return () => clearInterval(interval);
//     }
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

//   const preloadNextMedia = (nextIndex) => {
//     const nextMedia = mediaFiles[nextIndex];
//     if (nextMedia) {
//       const mediaType = nextMedia.content_type || "";
//       const mediaElement = mediaType.startsWith("video")
//         ? document.createElement("video")
//         : document.createElement("img");

//       mediaElement.src = nextMedia.url;
//       mediaElement.onload = () => {
//         preloadRef.current[nextMedia.url] = mediaElement;
//         setLoading(false);
//       };
//       mediaElement.onerror = () => {
//         console.error("Failed to preload media:", nextMedia.url);
//         setLoading(false);
//       };
//     }
//   };

//   const handleNext = () => {
//     setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//     const nextIndex = (currentIndex + 1) % mediaFiles.length;
//     preloadNextMedia((nextIndex + 1) % mediaFiles.length);
//     setCurrentIndex(nextIndex);
//     setLoading(true);
//     console.log("Next media:", mediaFiles[nextIndex]);
//   };

//   const handlePrevious = () => {
//     setTransitionIndex(Math.floor(Math.random() * transitionEffects.length));
//     const prevIndex =
//       (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
//     preloadNextMedia((prevIndex - 1 + mediaFiles.length) % mediaFiles.length);
//     setCurrentIndex(prevIndex);
//     setLoading(true);
//     console.log("Previous media:", mediaFiles[prevIndex]);
//   };

//   const transitionEffects = [
//     {
//       from: { opacity: 0 },
//       enter: { opacity: 1 },
//       leave: { opacity: 0 },
//     },
//     {
//       from: { opacity: 0, transform: "translateY(100%)" },
//       enter: { opacity: 1, transform: "translateY(0%)" },
//       leave: { opacity: 0, transform: "translateY(-100%)" },
//     },
//     {
//       from: { opacity: 0, transform: "scale(0.8)" },
//       enter: { opacity: 1, transform: "scale(1)" },
//       leave: { opacity: 0, transform: "scale(1.2)" },
//     },
//     {
//       from: { opacity: 0, transform: "rotateX(90deg)" },
//       enter: { opacity: 1, transform: "rotateX(0deg)" },
//       leave: { opacity: 0, transform: "rotateX(-90deg)" },
//     },
//     {
//       from: { opacity: 0, transform: "rotateY(90deg)" },
//       enter: { opacity: 1, transform: "rotateY(0deg)" },
//       leave: { opacity: 0, transform: "rotateY(-90deg)" },
//     },
//   ];

//   const currentMedia = mediaFiles[currentIndex];

//   const transitions = useTransition(currentMedia, {
//     ...transitionEffects[transitionIndex],
//     config: { tension: 300, friction: 30 },
//     keys: currentMedia?.url,
//   });

//   return (
//     <div
//       ref={screenSaverRef}
//       className="relative w-full h-full overflow-hidden"
//     >
//       {transitions((style, item) =>
//         item ? (
//           <animated.div
//             style={style}
//             className="absolute inset-0 flex items-center justify-center"
//           >
//             {item.content_type?.startsWith("video") ? (
//               <video
//                 ref={(el) => (videoRefs.current[item.url] = el)}
//                 src={item.url}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 controls
//                 className="object-cover w-full h-full"
//                 onLoadedData={() => {
//                   console.log("Video loaded successfully:", item.url);
//                 }}
//                 onPlay={() => console.log("Video is playing")}
//                 onPause={() => console.log("Video is paused")}
//                 onError={(e) => {
//                   console.error("Error loading video:", item.url, e);
//                 }}
//               />
//             ) : (
//               <img
//                 src={item.url}
//                 alt="media"
//                 className={`object-cover w-full h-full ${
//                   loading ? "hidden" : ""
//                 }`}
//                 onLoad={() => setLoading(false)}
//                 onError={() => {
//                   console.error("Error loading image:", item.url);
//                   setLoading(false);
//                 }}
//               />
//             )}
//             {loading && <p className="text-center text-white">Loading...</p>}
//           </animated.div>
//         ) : null
//       )}
//       <button
//         onClick={handlePrevious}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
//       >
//         &lt;
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
//       >
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default ScreenSaver;


import { fetchMedia } from "../services/api";
import { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import logo from '../../src/ujenzi.ico'; // Import your logo

const ScreenSaver = ({ projectId }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [loading, setLoading] = useState(true);
  const screenSaverRef = useRef(null);
  const videoRefs = useRef({});
  const preloadRef = useRef({});
  const [transitionIndex, setTransitionIndex] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetchMedia(projectId);
        if (response.media_files) {
          const mediaFilesWithAbsoluteUrls = response.media_files.map((media) => ({
            ...media,
            url: new URL(media.url, "http://localhost:3001").href,
          }));
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
        handleNext();
      }, 30000); // Change media every 30 seconds

      return () => clearInterval(interval);
    }
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

  const preloadNextMedia = (nextIndex) => {
    const nextMedia = mediaFiles[nextIndex];
    if (nextMedia) {
      const mediaType = nextMedia.content_type || "";
      const mediaElement = mediaType.startsWith("video")
        ? document.createElement("video")
        : document.createElement("img");

      mediaElement.src = nextMedia.url;
      mediaElement.onload = () => {
        preloadRef.current[nextMedia.url] = mediaElement;
        setLoading(false);
      };
      mediaElement.onerror = () => {
        console.error("Failed to preload media:", nextMedia.url);
        setLoading(false);
      };
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

  const transitionEffects = [
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
    {
      from: { opacity: 0, transform: "translateY(100%)" },
      enter: { opacity: 1, transform: "translateY(0%)" },
      leave: { opacity: 0, transform: "translateY(-100%)" },
    },
    {
      from: { opacity: 0, transform: "scale(0.8)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(1.2)" },
    },
    {
      from: { opacity: 0, transform: "rotateX(90deg)" },
      enter: { opacity: 1, transform: "rotateX(0deg)" },
      leave: { opacity: 0, transform: "rotateX(-90deg)" },
    },
    {
      from: { opacity: 0, transform: "rotateY(90deg)" },
      enter: { opacity: 1, transform: "rotateY(0deg)" },
      leave: { opacity: 0, transform: "rotateY(-90deg)" },
    },
  ];

  const currentMedia = mediaFiles[currentIndex];

  const transitions = useTransition(currentMedia, {
    ...transitionEffects[transitionIndex],
    config: { tension: 300, friction: 30 },
    keys: currentMedia?.url,
  });

  // Handle tap on left or right side of the screen
  const handleTap = (event) => {
    const width = window.innerWidth;
    const halfWidth = width / 2;
    const clickX = event.clientX;

    if (clickX < halfWidth) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <div
      ref={screenSaverRef}
      className="relative w-full h-full overflow-hidden"
      onClick={handleTap} // Add click handler to the main div
    >
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="absolute inset-0 flex items-center justify-center"
          >
            {item.content_type?.startsWith("video") ? (
              <video
                ref={(el) => (videoRefs.current[item.url] = el)}
                src={item.url}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="object-cover w-full h-full"
                onLoadedData={() => {
                  console.log("Video loaded successfully:", item.url);
                }}
                onPlay={() => console.log("Video is playing")}
                onPause={() => console.log("Video is paused")}
                onError={(e) => {
                  console.error("Error loading video:", item.url, e);
                }}
              />
            ) : (
              <img
                src={item.url}
                alt="media"
                className={`object-cover w-full h-full ${loading ? "hidden" : ""}`}
                onLoad={() => setLoading(false)}
                onError={() => {
                  console.error("Error loading image:", item.url);
                  setLoading(false);
                }}
              />
            )}
            {loading && <p className="text-center text-white">Loading...</p>}
            {/* Add logo overlay */}
            <img
              src={logo}
              alt="Logo"
              className="absolute bottom-4 right-4 w-30 h-24 opacity-40" // Adjust size and position as needed
            />
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default ScreenSaver;
