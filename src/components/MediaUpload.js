
import React, { useState } from 'react';
import { uploadMedia } from '../services/api'; // Implement this function

const MediaUpload = ({ projectId, onMediaUploaded }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('project_id', projectId);

      await uploadMedia(formData); // Ensure this function is implemented
      onMediaUploaded(); // Notify parent component
      setFile(null);
    } catch (error) {
      console.error('Error uploading media:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Media</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">
        Upload
      </button>
    </form>
  );
};

export default MediaUpload;
