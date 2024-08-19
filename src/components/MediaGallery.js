
// import { useSprings, animated } from '@react-spring/web';
// import { fetchMedia, deleteMedia } from '../services/api'; // Ensure deleteMedia is implemented
// import { useState,useEffect } from 'react';


// const MediaGallery = ({ projectId }) => {
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadMedia = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//           const response = await fetchMedia(projectId);
//           if (response.data && Array.isArray(response.data.media_files)) {
//             setMedia(response.data.media_files);
//           } else {
//             setMedia([]); // Handle cases where media_files might be missing
//           }
//         } catch (error) {
//           setError('Error fetching media: ' + error.message);
//           console.error('Error fetching media:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
      
//     loadMedia();
//   }, [projectId]);

//   const springs = useSprings(
//     media.length,
//     media.map((_, index) => ({
//       from: { opacity: 0 },
//       to: { opacity: 1 },
//       delay: index * 100,
//     }))
//   );

//   const handleDelete = async (mediaId) => {
//     try {
//       await deleteMedia(mediaId); // Ensure this function is correctly implemented
//       setMedia(media.filter((item) => item.id !== mediaId));
//     } catch (error) {
//       console.error('Error deleting media:', error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//       {media.map((item, index) => (
//         <animated.div
//           key={item.id}
//           style={springs[index]}
//           className="relative overflow-hidden rounded-lg shadow-lg"
//         >
//           {item.media_type === 'image' ? (
//             <img
//               src={item.file_url}
//               alt="media"
//               className="w-full h-auto object-cover"
//             />
//           ) : (
//             <video controls className="w-full h-auto">
//               <source src={item.file_url} type="video/mp4" />
//             </video>
//           )}
//           <button
//             onClick={() => handleDelete(item.id)}
//             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition"
//           >
//             &times;
//           </button>
//         </animated.div>
//       ))}
//     </div>
//   );
// };

// export default MediaGallery;
import { useSprings, animated } from '@react-spring/web';
import { fetchMedia, deleteMedia } from '../services/api';
import { useState, useEffect } from 'react';

const MediaGallery = ({ projectId }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMedia(projectId);
        if (response.data && Array.isArray(response.data.media_files)) {
          setMedia(response.data.media_files);
        } else {
          setMedia([]); // Handle cases where media_files might be missing
        }
      } catch (error) {
        setError('Error fetching media: ' + error.message);
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMedia();
  }, [projectId]);

  const springs = useSprings(
    media.length,
    media.map((_, index) => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: index * 100,
    }))
  );

  const handleDelete = async (mediaId) => {
    try {
      await deleteMedia(mediaId); // Ensure this function is correctly implemented
      setMedia(media.filter((item) => item.id !== mediaId));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-white">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {media.map((item, index) => (
        <animated.div
          key={item.id}
          style={springs[index]}
          className="relative overflow-hidden rounded-lg shadow-lg"
        >
          {item.media_type === 'image' ? (
            <img
              src={item.file_url}
              alt="media"
              className="w-full h-auto object-cover"
            />
          ) : (
            <video controls className="w-full h-auto">
              <source src={item.file_url} type="video/mp4" />
            </video>
          )}
          <button
            onClick={() => handleDelete(item.id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition"
          >
            &times;
          </button>
        </animated.div>
      ))}
    </div>
  );
};

export default MediaGallery;
