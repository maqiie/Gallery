
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

//   if (loading) return <p className="text-center text-lg font-medium">Loading projects...</p>;
//   if (error) return <p className="text-red-500 text-center text-lg font-medium">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <div key={project.id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
//             <h3 className="text-2xl font-semibold mb-3 text-gray-800">{project.title}</h3>
//             <p className="text-gray-600 mb-4">{project.description}</p>
//             <button
//               onClick={() => onProjectSelect(project)}
//               className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors hover:bg-blue-700"
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
import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api'; // Ensure this import is correct

const ProjectsList = ({ onProjectSelect }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data); // Adjusted to handle the direct response array
      } catch (error) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) return <p className="text-center text-lg font-medium text-blue-600">Loading projects...</p>;
  if (error) return <p className="text-red-600 text-center text-lg font-medium">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="p-6 bg-white rounded-lg shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">{project.title}</h3>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <button
              onClick={() => onProjectSelect(project)}
              className="bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-800"
            >
              View Project
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-medium text-gray-600">No projects available</p>
      )}
    </div>
  );
};

export default ProjectsList;
