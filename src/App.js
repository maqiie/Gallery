// import React, { useState } from 'react';
// import ProjectForm from './components/ProjectForm';
// import MediaUpload from './components/MediaUpload';
// import MediaGallery from './components/MediaGallery';
// import ScreenSaver from './components/ScreenSaver';

// function App() {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleProjectCreated = (project) => {
//     setSelectedProject(project);
//   };

//   const handleMediaUploaded = () => {
//     console.log('Media uploaded successfully!');
//   };

//   return (
//     <div className="App">
//       <h1>Project Media Display</h1>
//       <ProjectForm onProjectCreated={handleProjectCreated} />
//       {selectedProject && (
//         <>
//           <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
//           <MediaGallery projectId={selectedProject.id} />
//           <ScreenSaver projectId={selectedProject.id} />
//         </>
//       )}
//     </div>
//   );
// }

// // export default App;
// import React, { useState } from 'react';
// import ProjectForm from './components/ProjectForm';
// import MediaUpload from './components/MediaUpload';
// import MediaGallery from './components/MediaGallery';
// import ScreenSaver from './components/ScreenSaver';

// function App() {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleProjectCreated = (project) => {
//     setSelectedProject(project);
//   };

//   const handleMediaUploaded = () => {
//     console.log('Media uploaded successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <h1 className="text-4xl font-bold mb-6">Project Media Display</h1>
//       <ProjectForm onProjectCreated={handleProjectCreated} />
//       {selectedProject && (
//         <div className="w-full max-w-4xl mt-8">
//           <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
//           <MediaGallery projectId={selectedProject.id} />
//           <ScreenSaver projectId={selectedProject.id} />
//         </div>
//       )}
//     </div>
//   );
// }

// // export default App;import React, { useState } from 'react';
// import ProjectForm from './components/ProjectForm';
// import MediaUpload from './components/MediaUpload';
// import MediaGallery from './components/MediaGallery';
// import ScreenSaver from './components/ScreenSaver';
// import ProjectsList from './components/ProjectsList';
// import React, { useState } from 'react';


// function App() {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleProjectCreated = (project) => {
//     setSelectedProject(project);
//   };

//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//   };

//   const handleMediaUploaded = () => {
//     console.log('Media uploaded successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <h1 className="text-4xl font-bold mb-6">Project Media Display</h1>
      
//       <ProjectForm onProjectCreated={handleProjectCreated} />
      
//       <ProjectsList onProjectSelect={handleProjectSelect} />
      
//       {selectedProject && (
//         <div className="w-full max-w-4xl mt-8">
//           <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
//           <MediaGallery projectId={selectedProject.id} />
//           <ScreenSaver projectId={selectedProject.id} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import MediaUpload from './components/MediaUpload';
import MediaGallery from './components/MediaGallery';
import ScreenSaver from './components/ScreenSaver';
import ProjectsList from './components/ProjectsList';

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6">Project Media Display</h1>
      
      {/* Form to create a new project */}
      <ProjectForm onProjectCreated={handleProjectCreated} />
      
      {/* List of projects */}
      <ProjectsList onProjectSelect={handleProjectSelect} />
      
      {/* Conditional rendering for selected project */}
      {selectedProject && (
        <div className="w-full max-w-4xl mt-8">
          {/* Upload media for the selected project */}
          <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
          
          {/* Display media gallery */}
          <MediaGallery projectId={selectedProject.id} />
          
          {/* Display screensaver or slideshow */}
          <ScreenSaver projectId={selectedProject.id} />
        </div>
      )}
    </div>
  );
}

export default App;
