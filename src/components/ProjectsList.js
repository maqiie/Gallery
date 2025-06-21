import React, { useState, useEffect, useMemo } from 'react';
import { fetchProjects, deleteProject, fetchMedia } from '../services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaEye, FaEdit, FaImage, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

const API_URL = "http://localhost:3001";

const ProjectsList = ({ onProjectSelect, onEditProject, onCreateProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedProjects, setSelectedProjects] = useState(new Set());
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProjects();
      
      const projectsWithMedia = await Promise.all(
        response.map(async (project) => {
          try {
            const mediaResponse = await fetchMedia(project.id);
            return { 
              ...project, 
              media_files: mediaResponse.media_files || [],
              created_at: project.created_at || new Date().toISOString(),
              updated_at: project.updated_at || new Date().toISOString()
            };
          } catch (mediaError) {
            console.warn(`Failed to fetch media for project ${project.id}:`, mediaError);
            return { 
              ...project, 
              media_files: [],
              created_at: project.created_at || new Date().toISOString(),
              updated_at: project.updated_at || new Date().toISOString()
            };
          }
        })
      );
      
      setProjects(projectsWithMedia);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [projects, searchTerm, sortBy, sortOrder]);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(project => project.id !== projectId));
      setSelectedProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project. Please try again.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.size === 0) return;
    
    const confirmMessage = `Are you sure you want to delete ${selectedProjects.size} project${selectedProjects.size > 1 ? 's' : ''}? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await Promise.all(Array.from(selectedProjects).map(id => deleteProject(id)));
      setProjects(prev => prev.filter(project => !selectedProjects.has(project.id)));
      setSelectedProjects(new Set());
      setBulkDeleteMode(false);
      toast.success(`${selectedProjects.size} project${selectedProjects.size > 1 ? 's' : ''} deleted successfully`);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete some projects. Please try again.');
    }
  };

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getProjectImage = (mediaFiles) => {
    return mediaFiles && mediaFiles.length > 0
      ? `${API_URL}${mediaFiles[0].url}`
      : null;
  };

  const handleProjectSelect = (project) => {
    if (bulkDeleteMode) {
      toggleProjectSelection(project.id);
    } else {
      onProjectSelect(project);
      toast.info(`Viewing project: ${project.title}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-ping mx-auto"></div>
          </div>
          <p className="text-xl font-semibold text-slate-700 mb-2">Loading projects...</p>
          <p className="text-slate-500">Please wait while we fetch your creative work</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-red-800 text-xl font-semibold mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadProjects}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                My Projects
              </h1>
              <p className="text-slate-600">
                {projects.length > 0 ? `${projects.length} project${projects.length !== 1 ? 's' : ''} in your collection` : 'Manage and view your creative projects'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {projects.length > 0 && (
                <button
                  onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    bulkDeleteMode
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {bulkDeleteMode ? 'Cancel' : 'Bulk Delete'}
                </button>
              )}
              
              {onCreateProject && (
                <button
                  onClick={onCreateProject}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaPlus className="text-sm" />
                  New Project
                </button>
              )}
            </div>
          </div>

          {/* Search and Filter Bar */}
          {projects.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                >
                  <option value="created_at">Created Date</option>
                  <option value="updated_at">Updated Date</option>
                  <option value="title">Title</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 bg-white/90"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  <FaFilter className={`transform transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {bulkDeleteMode && selectedProjects.size > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
              <span className="text-red-700 font-medium">
                {selectedProjects.size} project{selectedProjects.size !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/20 ${
                  bulkDeleteMode && selectedProjects.has(project.id) ? 'ring-2 ring-red-500 ring-offset-2' : ''
                }`}
              >
                {/* Selection Checkbox */}
                {bulkDeleteMode && (
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProjects.has(project.id)}
                      onChange={() => toggleProjectSelection(project.id)}
                      className="w-5 h-5 rounded border-2 border-white bg-white/90 checked:bg-red-500 checked:border-red-500 transition-colors duration-200"
                    />
                  </div>
                )}

                {/* Image Container */}
                <div 
                  className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden cursor-pointer"
                  onClick={() => handleProjectSelect(project)}
                >
                  {getProjectImage(project.media_files) ? (
                    <img
                      src={getProjectImage(project.media_files)}
                      alt={`${project.title} cover`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                      <FaImage className="text-4xl text-slate-400 group-hover:text-slate-500 transition-colors duration-300" />
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions Overlay */}
                  {!bulkDeleteMode && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectSelect(project);
                          }}
                          className="bg-white/90 hover:bg-white text-slate-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                          title="View Project"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProject(project);
                          }}
                          className="bg-white/90 hover:bg-white text-slate-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                          title="Edit Project"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 flex-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
                      {formatDate(project.updated_at)}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description || 'No description available'}
                  </p>
                  
                  {/* Media Count */}
                  {project.media_files.length > 0 && (
                    <div className="flex items-center gap-1 mb-4 text-xs text-slate-500">
                      <FaImage />
                      <span>{project.media_files.length} media file{project.media_files.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  {!bulkDeleteMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleProjectSelect(project)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg"
                      >
                        <FaEye className="text-xs" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => onEditProject(project)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Edit"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Delete"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <FaImage className="text-4xl text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">
              {searchTerm ? 'No matching projects found' : 'No projects yet'}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              {searchTerm 
                ? `No projects match "${searchTerm}". Try adjusting your search terms.`
                : 'Start creating your first project to see it appear here. Your creative journey begins with a single step!'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
            {!searchTerm && onCreateProject && (
              <button
                onClick={onCreateProject}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
              >
                <FaPlus className="text-sm" />
                Create Your First Project
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;