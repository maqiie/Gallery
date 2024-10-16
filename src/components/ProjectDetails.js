import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectById, updateProject, uploadImage } from '../services/api'; // Adjust the path as needed
import { toast } from 'react-toastify'; // For notifications

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetchProjectById(id);
        setProject(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleUpdateProject = async () => {
    try {
      await updateProject(id, { title, description });
      setProject((prev) => ({ ...prev, title, description }));
      toast.success('Project updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!file) {
      toast.error('Please select an image to upload');
      return;
    }

    setUploading(true);

    try {
      await uploadImage(id, file);
      toast.success('Image uploaded successfully');
      // Reload project data to fetch the new image
      const updatedProject = await fetchProjectById(id);
      setProject(updatedProject.data);
      setFile(null); // Reset the file input
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center text-lg font-medium">Loading project details...</p>;
  if (error) return <p className="text-red-500 text-center text-lg font-medium">{error}</p>;
  if (!project) return <p className="text-center text-lg font-medium">Project not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
      <p className="text-lg mb-6">{project.description}</p>
      
      {/* Current Project Message */}
      <p className="text-lg text-blue-600 mb-4">You are viewing project: <strong>{project.title}</strong></p>

      {/* Edit Project Section */}
      {editMode ? (
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2 mr-2"
            placeholder="Project Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-2 w-full mb-4"
            placeholder="Project Description"
          />
          <button
            onClick={handleUpdateProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditToggle}
          className="bg-green-600 text-white px-4 py-2 rounded-md mb-6"
        >
          Edit Project
        </button>
      )}

      {/* Upload Image Section */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={handleUploadImage}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {/* Display Project Images */}
      {project.media_files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.media_files.map((media) => (
            <img
              key={media.id}
              src={`https://ujenzi-gallegry-75de7aa1ebe9.herokuapp.com${media.url}`} // Update URL as necessary
              alt={media.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
