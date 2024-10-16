import React, { useState, useEffect } from 'react';
import { uploadMedia, fetchProjectById } from '../services/api'; // Ensure fetchProjectById is implemented
import { toast } from 'react-toastify'; // For notifications

const MediaUpload = ({ projectId, onMediaUploaded }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');

  // Fetch project details to get the project name
  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await fetchProjectById(projectId); // Fetch project details
        setProjectName(project.name); // Set the project name
      } catch (error) {
        toast.error('Failed to load project details');
        console.error('Error fetching project details:', error);
      }
    };

    loadProject();
  }, [projectId]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Allow multiple files
    const validFiles = selectedFiles.filter((file) => validateFile(file));
    setFiles(validFiles);
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // Acceptable file types
    const maxSize = 5 * 1024 * 1024; // Max size 5MB
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
      return false;
    }
    if (file.size > maxSize) {
      toast.error('File size exceeds 5MB.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error('Please select at least one file to upload.');
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('media[]', file)); // Send multiple files
      formData.append('project_id', projectId); // Correctly append project_id to formData
  
      await uploadMedia(projectId, formData); // Pass project_id as part of the URL or body
      onMediaUploaded(); // Notify parent component
  
      setFiles([]); // Clear selected files
      toast.success('Media uploaded successfully!');
    } catch (error) {
      toast.error('Error uploading media');
      console.error('Error uploading media:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-4">
      {/* Display Project Name */}
      <h2 className="text-2xl font-semibold mb-4">
        Upload Media to Project: <span className="text-indigo-600">{projectName || 'Loading...'}</span>
      </h2>

      {/* File Input */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4 border border-gray-300 p-2 rounded-lg"
      />

      {/* Display Selected Files */}
      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="text-sm">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button with Loading Indicator */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Optional: Show a Spinner or Loading Indicator */}
      {loading && <p className="text-blue-500 mt-2">Uploading files, please wait...</p>}
    </form>
  );
};

export default MediaUpload;
