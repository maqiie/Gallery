import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '../services/api'; // Adjust the path as needed

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetchProjectById(id);
        setProject(response.data);
      } catch (error) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) return <p className="text-center text-lg font-medium">Loading project details...</p>;
  if (error) return <p className="text-red-500 text-center text-lg font-medium">{error}</p>;

  if (!project) return <p className="text-center text-lg font-medium">Project not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
      <p className="text-lg mb-6">{project.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.images && project.images.length > 0 ? (
          project.images.map((image, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
              <img src={image.url} alt={`Project Image ${index + 1}`} className="w-full h-auto rounded-lg" />
            </div>
          ))
        ) : (
          <p>No images available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
