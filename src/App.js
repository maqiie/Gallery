
// import React, { useState } from 'react';
// import ProjectForm from './components/ProjectForm';
// import MediaUpload from './components/MediaUpload';
// import MediaGallery from './components/MediaGallery';
// import ScreenSaver from './components/ScreenSaver';
// import ProjectsList from './components/ProjectsList';

// function App() {
//   const [selectedProject, setSelectedProject] = useState(null);

//   // Handle project creation
//   const handleProjectCreated = (project) => {
//     setSelectedProject(project);
//   };

//   // Handle project selection from the list
//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//   };

//   // Handle media upload completion
//   const handleMediaUploaded = () => {
//     console.log('Media uploaded successfully!');
//     // Optionally, you can refresh media gallery here or show a success message
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <h1 className="text-4xl font-bold mb-6">UJENZI PHOTOS</h1>
      
//       {/* Form to create a new project */}
//       <ProjectForm onProjectCreated={handleProjectCreated} />
      
//       {/* List of projects */}
//       <ProjectsList onProjectSelect={handleProjectSelect} />
      
//       {/* Conditional rendering for selected project */}
//       {selectedProject && (
//         <div className="w-full max-w-4xl mt-8">
//           {/* Upload media for the selected project */}
//           <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
          
//           {/* Display media gallery */}
//           <MediaGallery projectId={selectedProject.id} />
          
//           {/* Display screensaver or slideshow */}
//           <ScreenSaver projectId={selectedProject.id} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { FaPlus, FaCamera, FaProjectDiagram } from 'react-icons/fa'; // Importing icons
import ProjectForm from './components/ProjectForm';
import MediaUpload from './components/MediaUpload';
import MediaGallery from './components/MediaGallery';
import ScreenSaver from './components/ScreenSaver';
import ProjectsList from './components/ProjectsList';
import './Styles.css';


function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle project creation
  const handleProjectCreated = (project) => {
    setSelectedProject(project);
  };

  // Handle project selection from the list
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  // Handle media upload completion
  const handleMediaUploaded = () => {
    console.log('Media uploaded successfully!');
    // Optionally, you can refresh media gallery here or show a success message
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6 lg:px-20 font-poppins">
      {/* Header Section */}
      <header className="w-full max-w-6xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-10 px-8 rounded-lg shadow-xl mb-12 hover:shadow-2xl transition duration-300">
        <h1 className="text-4xl lg:text-6xl font-bold text-center flex items-center justify-center tracking-tight">
          <FaCamera className="mr-4" /> UJENZI PHOTOS
        </h1>
      </header>

      {/* Create New Project Form */}
      <section className="w-full max-w-6xl bg-white p-8 lg:p-12 rounded-lg shadow-lg mb-12 hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaPlus className="mr-3 text-indigo-500" /> Create New Project
        </h2>
        <ProjectForm onProjectCreated={handleProjectCreated} />
      </section>

      {/* Projects List */}
      <section className="w-full max-w-6xl bg-white p-8 lg:p-12 rounded-lg shadow-lg mb-12 hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaProjectDiagram className="mr-3 text-indigo-500" /> Projects List
        </h2>
        <ProjectsList onProjectSelect={handleProjectSelect} />
      </section>

      {/* Selected Project Details */}
      {selectedProject && (
        <section className="w-full max-w-6xl bg-white p-8 lg:p-12 rounded-lg shadow-lg mt-12 hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">Project Details</h2>
          <div className="mb-8">
            <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
          </div>
          <div className="mb-8">
            <MediaGallery projectId={selectedProject.id} />
          </div>
          <div>
            <ScreenSaver projectId={selectedProject.id} />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
