import React, { useState, useEffect } from 'react';
import { fetchProject, deleteProject, uploadMoreMedia } from '../services/api';

const ViewProject = ({ projectId, onProjectDeleted }) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newMedia, setNewMedia] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetchProject(projectId);
        setProject(response);
      } catch (error) {
        setError('Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [projectId]);

  const handleUploadMore = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      newMedia.forEach((media) => formData.append('media[]', media));

      await uploadMoreMedia(projectId, formData);
      const updatedProject = await fetchProject(projectId);
      setProject(updatedProject);
      setNewMedia([]);
    } catch (error) {
      setError('Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteProject(projectId);
      onProjectDeleted();
    } catch (error) {
      setError('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    setNewMedia([...e.target.files]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">View Project</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {project && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">{project.title}</h3>
          <p className="text-lg mb-6 text-gray-600">{project.description}</p>
          <div className="mb-6">
            <h4 className="text-xl font-medium mb-2 text-gray-700">Project Media</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.images.map((img, index) => (
                <img key={index} src={img.url} alt={`Project media ${index}`} className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          </div>
          <form onSubmit={handleUploadMore} className="mb-6">
            <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="newMedia">
              Upload More Media
            </label>
            <input
              type="file"
              id="newMedia"
              multiple
              onChange={handleMediaChange}
              className="w-full p-4 border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:border-blue-500"
            />
            <button
              type="submit"
              className={`bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Media'}
            </button>
          </form>
          <button
            onClick={handleDeleteProject}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Delete Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
