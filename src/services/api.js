// import axios from 'axios';

// const API_URL = 'http://localhost:3001'; // Replace with your Rails backend URL

// // const API_URL = 'https://gallery-db.onrender.com'; // Replace with your Rails backend URL

// // Fetch project details
// export const fetchProjectById = async (projectId) => {
//   try {
//     const response = await fetch(`${API_URL}/projects/${projectId}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Error response:', errorText);
//       throw new Error('Failed to fetch project');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error in fetchProjectById:', error);
//     throw error;
//   }
// };

// // Fetch media for a specific project
// export const fetchMedia = async (projectId) => {
//     try {
//       const response = await axios.get(`${API_URL}/projects/${projectId}/media`);
//       return response.data; // This should return { media_files: [...] }
//     } catch (error) {
//       throw new Error('Failed to fetch media: ' + error.message);
//     }
//   };
  
// // services/api.js
// export const createProject = async (formData) => {
//     try {
//       const response = await axios.post(`${API_URL}/projects`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error in createProject:', error);
//       throw new Error('Failed to create project');
//     }
//   };

// // Upload media for a specific project
// export const uploadMedia = (projectId, formData) => axios.post(`${API_URL}/projects/${projectId}/media`, formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

// // Fetch all projects
// export const fetchProjects = () => axios.get(`${API_URL}/projects`);

// // Delete a specific media item
// export const deleteMedia = async (mediaId) => {
//   try {
//     const response = await fetch(`${API_URL}/media/${mediaId}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       const errorText = await response.text(); // Read response as text for debugging
//       console.error('Error response:', errorText);
//       throw new Error('Failed to delete media');
//     }
    
//     // Ensure JSON response
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error in deleteMedia:', error);
//     throw error;
//   }
// };

// // / Delete a specific project
// export const deleteProject = async (projectId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/projects/${projectId}`);
    
//     if (response.status !== 200) {
//       throw new Error('Failed to delete project');
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error('Error in deleteProject:', error);
//     throw error;
//   }
// };
import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Use environment variable for flexibility
const API_URL = 'http://localhost:3001'; // Replace with your Rails backend URL

// Fetch a project by ID, including its media
export const fetchProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error in fetchProjectById:', error.response || error.message);
    throw new Error('Failed to fetch the project');
  }
};

// Fetch media files for a specific project
export const fetchMedia = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/media`);
    return response.data; // Assuming the response has { media_files: [...] }
  } catch (error) {
    console.error('Error fetching media:', error.response || error.message);
    throw new Error('Failed to fetch media for the project');
  }
};

// Create a new project (including media)
export const createProject = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error in createProject:', error.response || error.message);
    throw new Error('Failed to create project');
  }
};

// Upload media to a specific project
// export const uploadMedia = async (projectId, formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/projects/${projectId}/add_media`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading media:', error.response || error.message);
//     throw new Error('Failed to upload media');
//   }
// };

// Fetch all projects (including media for each)
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    const projects = response.data;

    // Fetch media for each project
    const projectsWithMedia = await Promise.all(
      projects.map(async (project) => {
        const media = await fetchMedia(project.id);
        return { ...project, media_files: media.media_files };
      })
    );

    return projectsWithMedia;
  } catch (error) {
    console.error('Error fetching projects:', error.response || error.message);
    throw new Error('Failed to fetch projects');
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error.response || error.message);
    throw new Error('Failed to delete project');
  }
};

// Delete a specific media item
export const deleteMedia = async (mediaId) => {
  try {
    const response = await axios.delete(`${API_URL}/media/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting media:', error.response || error.message);
    throw new Error('Failed to delete media');
  }
};

export const uploadMedia = async (projectId, formData) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}/add_media`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload media');
    }

    return response.json(); // Handle the response as needed
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};
