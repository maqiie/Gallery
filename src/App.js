import React, { useState } from 'react';
import { FaPlus, FaCamera, FaProjectDiagram, FaTrash } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import ProjectForm from './components/ProjectForm';
import MediaUpload from './components/MediaUpload';
import MediaGallery from './components/MediaGallery';
import ScreenSaver from './components/ScreenSaver';
import ProjectsList from './components/ProjectsList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Handle project creation
  const handleProjectCreated = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
    setSelectedProject(project);
    toast.success('Project created successfully!');
  };

  // Handle project selection from the list
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  // Handle project deletion
  const handleProjectDelete = (projectId) => {
    setProjects((prevProjects) => prevProjects.filter(p => p.id !== projectId));
    setSelectedProject(null);
    toast.info('Project deleted successfully!');
  };

  // Handle media upload completion
  const handleMediaUploaded = () => {
    toast.success('Media uploaded successfully!');
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    } relative overflow-hidden`}>
      
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 right-20 w-32 h-32 ${
          darkMode ? 'bg-blue-400/10' : 'bg-blue-500/5'
        } rounded-full blur-xl animate-float`}></div>
        <div className={`absolute bottom-32 left-20 w-48 h-48 ${
          darkMode ? 'bg-indigo-400/10' : 'bg-indigo-500/5'
        } rounded-full blur-xl animate-float-delayed`}></div>
        <div className={`absolute top-1/3 left-1/2 w-24 h-24 ${
          darkMode ? 'bg-purple-400/10' : 'bg-purple-500/5'
        } rounded-full blur-xl animate-float-slow`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
        
        {/* Corporate Header */}
        <header className="mb-16">
          <div className="text-center relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  darkMode ? 'bg-slate-700/50' : 'bg-white/80'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-slate-600' : 'border-slate-200'
                } shadow-sm`}>
                  <FaCamera className={`text-2xl ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  } mr-3`} />
                  <span className={`text-sm font-medium tracking-wide ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>ENTERPRISE SOLUTIONS</span>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-3 rounded-xl ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'
                  } shadow-sm border ${
                    darkMode ? 'border-slate-700' : 'border-slate-200'
                  } transition-all duration-300 hover:shadow-md`}
                >
                  {darkMode ? 
                    <Sun size={20} className="text-amber-400" /> : 
                    <Moon size={20} className="text-slate-600" />
                  }
                </button>
              </div>
            </div>
            
            <h1 className={`text-5xl lg:text-7xl font-light tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Projects <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className={`text-xl ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            } max-w-2xl mx-auto leading-relaxed`}>
              Streamline your corporate projects with our comprehensive management platform
            </p>
          </div>
        </header>

        {/* Create New Project Section */}
        <section className="mb-16">
          <div className={`relative ${
            darkMode ? 'bg-slate-800/40' : 'bg-white/80'
          } backdrop-blur-xl rounded-2xl shadow-lg border ${
            darkMode ? 'border-slate-700/50' : 'border-slate-200/50'
          } overflow-hidden group hover:shadow-xl transition-all duration-500`}>
            
            {/* Section Header */}
            <div className={`px-8 py-6 border-b ${
              darkMode ? 'border-slate-700/50 bg-slate-800/60' : 'border-slate-200/50 bg-slate-50/50'
            }`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                } mr-4`}>
                  <FaPlus className={`text-xl ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-semibold ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Create New Project
                  </h2>
                  <p className={`text-sm ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  } mt-1`}>
                    Initialize a new corporate project workspace
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <ProjectForm onProjectCreated={handleProjectCreated} darkMode={darkMode} />
            </div>
          </div>
        </section>

        {/* Projects List Section */}
        <section className="mb-16">
          <div className={`relative ${
            darkMode ? 'bg-slate-800/40' : 'bg-white/80'
          } backdrop-blur-xl rounded-2xl shadow-lg border ${
            darkMode ? 'border-slate-700/50' : 'border-slate-200/50'
          } overflow-hidden group hover:shadow-xl transition-all duration-500`}>
            
            {/* Section Header */}
            <div className={`px-8 py-6 border-b ${
              darkMode ? 'border-slate-700/50 bg-slate-800/60' : 'border-slate-200/50 bg-slate-50/50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'
                  } mr-4`}>
                    <FaProjectDiagram className={`text-xl ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-semibold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Active Projects
                    </h2>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    } mt-1`}>
                      Manage your organization's project portfolio
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  darkMode ? 'bg-slate-700' : 'bg-slate-100'
                } text-sm font-medium ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {projects.length} Projects
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <ProjectsList 
                projects={projects} 
                onProjectSelect={handleProjectSelect} 
                darkMode={darkMode}
              />
            </div>
          </div>
        </section>

        {/* Selected Project Details */}
        {selectedProject ? (
          <section>
            <div className={`relative ${
              darkMode ? 'bg-slate-800/40' : 'bg-white/80'
            } backdrop-blur-xl rounded-2xl shadow-lg border ${
              darkMode ? 'border-slate-700/50' : 'border-slate-200/50'
            } overflow-hidden group hover:shadow-xl transition-all duration-500`}>
              
              {/* Section Header */}
              <div className={`px-8 py-6 border-b ${
                darkMode ? 'border-slate-700/50 bg-slate-800/60' : 'border-slate-200/50 bg-slate-50/50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-semibold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {selectedProject.title}
                    </h2>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    } mt-1`}>
                      Project workspace and media management
                    </p>
                  </div>
                  <button
                    onClick={() => handleProjectDelete(selectedProject.id)}
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-md"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <MediaUpload projectId={selectedProject.id} onMediaUploaded={handleMediaUploaded} />
                </div>
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <MediaGallery projectId={selectedProject.id} />
                </div>
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <ScreenSaver projectId={selectedProject.id} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div className={`relative ${
              darkMode ? 'bg-slate-800/20' : 'bg-white/60'
            } backdrop-blur-xl rounded-2xl shadow-lg border ${
              darkMode ? 'border-slate-700/30' : 'border-slate-200/30'
            } text-center py-16`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${
                darkMode ? 'bg-slate-700' : 'bg-slate-100'
              } flex items-center justify-center`}>
                <FaProjectDiagram className={`text-2xl ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </div>
              <h3 className={`text-2xl font-semibold ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              } mb-3`}>
                No Project Selected
              </h3>
              <p className={`${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              } max-w-md mx-auto`}>
                Select a project from your portfolio to view detailed information and manage media assets
              </p>
            </div>
          </section>
        )}

        {/* Toast Notifications */}
        <ToastContainer 
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          toastClassName={`${
            darkMode ? 'bg-slate-800' : 'bg-white'
          } backdrop-blur-sm rounded-xl shadow-xl border ${
            darkMode ? 'border-slate-700' : 'border-slate-200'
          }`}
          bodyClassName={`${
            darkMode ? 'text-slate-200' : 'text-slate-800'
          } font-medium`}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .Toastify__toast {
          border-radius: 0.75rem !important;
          backdrop-filter: blur(12px) !important;
        }
        .Toastify__toast--success {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(21, 128, 61, 0.95) 100%) !important;
        }
        .Toastify__toast--info {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%) !important;
        }
      `}</style>
    </div>
  );
}

export default App;