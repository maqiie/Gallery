// import axios from 'axios';

// const API_URL = 'http://localhost:3001'; // Replace with your Rails backend URL

// export const createProject = (project) => axios.post(`${API_URL}/projects`, project);
// export const uploadMedia = (projectId, formData) => axios.post(`${API_URL}/projects/${projectId}/media`, formData);
// export const fetchMedia = (projectId) => axios.get(`${API_URL}/projects/${projectId}/media`);
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your Rails backend URL

// Fetch project details
export const fetchProjectById = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to fetch project');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchProjectById:', error);
    throw error;
  }
};

// Fetch media for a specific project
export const fetchMedia = async (projectId) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}/media`);
      return response.data; // This should return { media_files: [...] }
    } catch (error) {
      throw new Error('Failed to fetch media: ' + error.message);
    }
  };
  
// services/api.js
export const createProject = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in createProject:', error);
      throw new Error('Failed to create project');
    }
  };

// Upload media for a specific project
export const uploadMedia = (projectId, formData) => axios.post(`${API_URL}/projects/${projectId}/media`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Fetch all projects
export const fetchProjects = () => axios.get(`${API_URL}/projects`);

// Delete a specific media item
export const deleteMedia = async (mediaId) => {
  try {
    const response = await fetch(`${API_URL}/media/${mediaId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read response as text for debugging
      console.error('Error response:', errorText);
      throw new Error('Failed to delete media');
    }
    
    // Ensure JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in deleteMedia:', error);
    throw error;
  }
};
