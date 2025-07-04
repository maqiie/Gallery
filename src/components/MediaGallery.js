
import { fetchMedia, deleteMedia } from "../services/api";
import { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";

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
        setError("Error fetching media: " + error.message);
        console.error("Error fetching media:", error);
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
      console.error("Error deleting media:", error);
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-white">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {springs.map((style, index) => (
        <animated.div
          key={media[index].id}
          style={style}
          className="relative overflow-hidden"
        >
          {media[index].content_type.startsWith("video") ? (
            <video
              src={media[index].url}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={media[index].url}
              alt="media"
              className="object-cover w-full h-full"
            />
          )}
          <button
            onClick={() => handleDelete(media[index].id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
          >
            &times;
          </button>
        </animated.div>
      ))}
    </div>
  );
};

export default MediaGallery;
