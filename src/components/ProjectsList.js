
// import React, { useState, useEffect } from 'react';
// import { fetchProjects } from '../services/api'; // Ensure this import is correct

// const ProjectsList = ({ onProjectSelect }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const response = await fetchProjects();
//         setProjects(response.data); // Adjusted to handle the direct response array
//       } catch (error) {
//         setError('Failed to load projects');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   if (loading) return <p className="text-center text-lg font-medium text-blue-600">Loading projects...</p>;
//   if (error) return <p className="text-red-600 text-center text-lg font-medium">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <div key={project.id} className="p-6 bg-white rounded-lg shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
//             <h3 className="text-2xl font-semibold mb-3 text-gray-900">{project.title}</h3>
//             <p className="text-gray-700 mb-4">{project.description}</p>
//             <button
//               onClick={() => onProjectSelect(project)}
//               className="bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-800"
//             >
//               View Project
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-lg font-medium text-gray-600">No projects available</p>
//       )}
//     </div>
//   );
// };

// export default ProjectsList;


// import React, { useState, useEffect } from 'react';
// import { fetchProjects, deleteProject } from '../services/api'; // Ensure this import is correct
// import { toast } from 'react-toastify';

// const ProjectsList = ({ onProjectSelect }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const response = await fetchProjects();
//         setProjects(response.data);
//       } catch (error) {
//         setError('Failed to load projects');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   const handleDelete = async (projectId) => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return;

//     try {
//       await deleteProject(projectId);
//       setProjects(projects.filter(project => project.id !== projectId));
//       toast.success('Project deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete project');
//     }
//   };

//   if (loading) return <p className="text-center text-lg font-medium text-blue-600">Loading projects...</p>;
//   if (error) return <p className="text-red-600 text-center text-lg font-medium">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <div
//             key={project.id}
//             className="relative p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
//           >
//             <h3 className="text-2xl font-semibold mb-3 text-white">{project.title}</h3>
//             <p className="text-gray-100 mb-4">{project.description}</p>
//             <div className="flex justify-between">
//               <button
//                 onClick={() => onProjectSelect(project)}
//                 className="bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-800"
//               >
//                 View Project
//               </button>
//               <button
//                 onClick={() => handleDelete(project.id)}
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-lg font-medium text-gray-600">No projects available</p>
//       )}
//     </div>
//   );
// };

// export default ProjectsList;
// import React, { useState, useEffect } from 'react';
// import { fetchProjects, deleteProject } from '../services/api';
// import { toast } from 'react-toastify';
// import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
// import './ProjectList.css';

// const ProjectsList = ({ onProjectSelect }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const response = await fetchProjects();
//         setProjects(response.data);
//       } catch (error) {
//         setError('Failed to load projects');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   const handleDelete = async (projectId) => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return;

//     try {
//       await deleteProject(projectId);
//       setProjects(projects.filter((project) => project.id !== projectId));
//       toast.success('Project deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete project');
//     }
//   };

//   if (loading) return <p className="text-center text-2xl font-semibold text-blue-600">Loading projects...</p>;
//   if (error) return <p className="text-red-600 text-center text-2xl font-semibold">{error}</p>;

//   return (
//     <div className="p-8 lg:p-12 bg-gray-50 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <div
//               key={project.id}
//               className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out project-card"
//             >
//               <div className="p-8">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h3>
//                 <p className="text-gray-600 mb-8">{project.description}</p>
//               </div>

//               {/* Hover Actions */}
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-6 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                 <button
//                   onClick={() => onProjectSelect(project)}
//                   className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
//                 >
//                   <FaEye className="inline-block mr-2" /> View
//                 </button>
//                 <button
//                   onClick={() => console.log('Edit project', project.id)}
//                   className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition duration-200"
//                 >
//                   <FaEdit className="inline-block mr-2" /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(project.id)}
//                   className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200"
//                 >
//                   <FaTrash className="inline-block mr-2" /> Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-xl font-semibold text-gray-600">No projects available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectsList;

import React, { useState, useEffect } from 'react';
import { fetchProjects, deleteProject, fetchMedia } from '../services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import './ProjectList.css';

const API_URL = "https://your-api-url.com"; // Add your API URL

const ProjectsList = ({ onProjectSelect, onEditProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        const projectsWithMedia = await Promise.all(
          response.map(async (project) => {
            const mediaResponse = await fetchMedia(project.id);
            return { ...project, media_files: mediaResponse.media_files };
          })
        );
        setProjects(projectsWithMedia);
      } catch (error) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <p className="text-center text-2xl font-semibold text-blue-600">Loading projects...</p>;
  if (error) return <p className="text-red-600 text-center text-2xl font-semibold">{error}</p>;

  return (
    <div className="p-8 lg:p-12 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out project-card"
            >
              {/* Media Section */}
              <div className="relative">
                {project.media_files && project.media_files.length > 0 ? (
                  <img
                    src={`${API_URL}${project.media_files[0].url}`} // Ensure media URL is correct
                    alt={`${project.title} cover`}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-8">{project.description}</p>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-6 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <button
                  onClick={() => onProjectSelect(project)}
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  <FaEye className="inline-block mr-2" /> View
                </button>
                <button
                  onClick={() => onEditProject(project)} // Pass the project to the edit form
                  className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  <FaEdit className="inline-block mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200"
                >
                  <FaTrash className="inline-block mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-semibold text-gray-600">No projects available</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
