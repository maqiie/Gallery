// import React, { useState } from 'react';
// import { Upload, X, Image, FileText, Sparkles, ArrowRight, Check } from 'lucide-react';

// const ProjectForm = ({ onProjectCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const formData = new FormData();
//       formData.append('project[title]', title);
//       formData.append('project[description]', description);
//       images.forEach((image) => formData.append('project[images][]', image));
      
//       // Simulate API call since we don't have the actual createProject function
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Mock successful response
//       const response = { id: Date.now(), title, description, images: images.length };
//       onProjectCreated?.(response);
      
//       // Reset form
//       setTitle('');
//       setDescription('');
//       setImages([]);
//       setImagePreviews([]);
//     } catch (error) {
//       setError('Failed to create project. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (files) => {
//     const fileArray = Array.from(files);
//     setImages(fileArray);
    
//     // Create preview URLs
//     const previews = fileArray.map(file => ({
//       file,
//       url: URL.createObjectURL(file),
//       name: file.name
//     }));
//     setImagePreviews(previews);
//   };

//   const removeImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     const newPreviews = imagePreviews.filter((_, i) => i !== index);
//     setImages(newImages);
//     setImagePreviews(newPreviews);
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageChange(e.dataTransfer.files);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 flex items-center justify-center">
//       <div className="w-full max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium mb-4">
//             <Sparkles className="h-4 w-4" />
//             Create Something Amazing
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
//             New Project
//           </h1>
//           <p className="text-gray-600 text-lg">Bring your vision to life with stunning visuals</p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="p-8 md:p-12">
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
//                 <p className="text-red-600 text-center font-medium">{error}</p>
//               </div>
//             )}

//             <div className="space-y-8">
//               {/* Project Title */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                   <FileText className="h-5 w-5 text-blue-600" />
//                   Project Title
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="Enter your project title..."
//                     className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 group-hover:shadow-md"
//                     required
//                   />
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//                 </div>
//               </div>

//               {/* Project Description */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                   <FileText className="h-5 w-5 text-blue-600" />
//                   Project Description
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Describe your project in detail..."
//                     rows="6"
//                     className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none group-hover:shadow-md"
//                     required
//                   />
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                   <Image className="h-5 w-5 text-blue-600" />
//                   Project Images
//                 </label>
                
//                 <div
//                   className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${
//                     dragActive
//                       ? 'border-blue-500 bg-blue-50/50 scale-[1.02]'
//                       : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e.target.files)}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
                  
//                   <div className="flex flex-col items-center gap-4">
//                     <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
//                       <Upload className="h-8 w-8 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="text-xl font-semibold text-gray-700 mb-2">
//                         Drop images here or click to browse
//                       </p>
//                       <p className="text-gray-500">
//                         Support for JPG, PNG, GIF up to 10MB each
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Image Preview Grid */}
//                 {imagePreviews.length > 0 && (
//                   <div className="mt-6">
//                     <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                       Selected Images ({imagePreviews.length})
//                     </h4>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative group">
//                           <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
//                             <img
//                               src={preview.url}
//                               alt={preview.name}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
//                           >
//                             <X className="h-4 w-4" />
//                           </button>
//                           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <p className="text-white text-xs truncate">{preview.name}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={loading || !title.trim() || !description.trim()}
//                   className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
//                   <div className="relative flex items-center justify-center gap-3">
//                     {loading ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Creating Project...
//                       </>
//                     ) : (
//                       <>
//                         <Check className="h-5 w-5 group-hover:scale-110 transition-transform" />
//                         Create Project
//                         <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </div>
                  
//                   {/* Shimmer effect */}
//                   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-gray-500">
//             Ready to showcase your work? Upload high-quality images for the best results.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

// import React, { useState } from 'react';
// import { createProject } from '../services/api';

// const ProjectForm = ({ onProjectCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('project[title]', title);
//       formData.append('project[description]', description);
//       images.forEach((image) => formData.append('project[images][]', image));

//       const response = await createProject(formData);
//       onProjectCreated(response);
//       setTitle('');
//       setDescription('');
//       setImages([]);
//     } catch (error) {
//       setError('An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-4xl mx-auto space-y-6 transition-transform transform hover:scale-105"
//     >
//       <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Create Project</h2>
//       {error && <p className="text-red-600 text-center">{error}</p>}
      
//       <div>
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="title">
//           Project Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//           required
//         />
//       </div>
      
//       <div>
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="description">
//           Project Description
//         </label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//           rows="6"
//           required
//         />
//       </div>
      
//       <div>
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="images">
//           Upload Images
//         </label>
//         <input
//           type="file"
//           id="images"
//           multiple
//           onChange={handleImageChange}
//           className="w-full p-4 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//         />
//       </div>
      
//       <button
//         type="submit"
//         className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Creating...' : 'Create Project'}
//       </button>
//     </form>
//   );
// };

// export default ProjectForm;
import React, { useState } from 'react';
import { createProject } from '../services/api';
import { FaUpload, FaImage, FaTimes, FaPlus, FaFileImage, FaCheckCircle } from 'react-icons/fa';

const ProjectForm = ({ onProjectCreated, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validation
    if (!title.trim()) {
      setError('Project title is required');
      return;
    }
    if (!description.trim()) {
      setError('Project description is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('project[title]', title.trim());
      formData.append('project[description]', description.trim());
      
      images.forEach((image) => {
        formData.append('project[images][]', image);
      });

      const response = await createProject(formData);
      onProjectCreated(response);
      
      // Reset form
      setTitle('');
      setDescription('');
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      setError(error.message || 'Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Image size should be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setImages(prev => [...prev, ...validFiles]);
    
    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          url: e.target.result,
          name: file.name,
          size: file.size
        }]);
      };
      reader.readAsDataURL(file);
    });

    setError(null);
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className={`p-4 rounded-xl border ${
          darkMode 
            ? 'bg-red-900/20 border-red-800 text-red-300' 
            : 'bg-red-50 border-red-200 text-red-800'
        } flex items-center space-x-3`}>
          <div className={`w-5 h-5 rounded-full ${
            darkMode ? 'bg-red-800' : 'bg-red-100'
          } flex items-center justify-center flex-shrink-0`}>
            <FaTimes className={`text-xs ${
              darkMode ? 'text-red-400' : 'text-red-600'
            }`} />
          </div>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Project Title */}
      <div className="space-y-2">
        <label className={`block text-sm font-semibold ${
          darkMode ? 'text-slate-200' : 'text-slate-700'
        }`} htmlFor="title">
          Project Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
            darkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20' 
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20'
          } focus:outline-none focus:ring-4 shadow-sm hover:shadow-md`}
          placeholder="Enter a descriptive project title..."
          required
        />
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <label className={`block text-sm font-semibold ${
          darkMode ? 'text-slate-200' : 'text-slate-700'
        }`} htmlFor="description">
          Project Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
            darkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20' 
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20'
          } focus:outline-none focus:ring-4 shadow-sm hover:shadow-md`}
          rows="4"
          placeholder="Provide a detailed description of your project objectives, scope, and key deliverables..."
          required
        />
        <div className={`text-xs ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        } text-right`}>
          {description.length}/500 characters
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <label className={`block text-sm font-semibold ${
          darkMode ? 'text-slate-200' : 'text-slate-700'
        }`}>
          Project Images
        </label>
        
        {/* Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
            dragActive
              ? darkMode
                ? 'border-blue-400 bg-blue-900/20'
                : 'border-blue-500 bg-blue-50'
              : darkMode
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-slate-300 hover:border-slate-400'
          } ${
            darkMode ? 'bg-slate-800/50' : 'bg-slate-50'
          } hover:bg-opacity-80`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center py-12 px-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${
              darkMode ? 'bg-slate-700' : 'bg-white'
            } flex items-center justify-center shadow-sm`}>
              <FaUpload className={`text-2xl ${
                dragActive
                  ? 'text-blue-500'
                  : darkMode
                    ? 'text-slate-400'
                    : 'text-slate-500'
              }`} />
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {dragActive ? 'Drop images here' : 'Upload Project Images'}
            </h3>
            
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            } mb-4`}>
              Drag and drop your images here, or click to browse
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-xs">
              <span className={`flex items-center ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <FaFileImage className="mr-1" />
                JPG, PNG, WebP
              </span>
              <span className={`${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Max 10MB each
              </span>
            </div>
          </div>
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="space-y-4">
            <h4 className={`text-sm font-medium ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Selected Images ({previewImages.length})
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewImages.map((preview, index) => (
                <div
                  key={preview.id}
                  className={`relative group rounded-xl overflow-hidden ${
                    darkMode ? 'bg-slate-800' : 'bg-white'
                  } shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className="aspect-square relative">
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                    
                    {/* File Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <p className="text-xs font-medium truncate">{preview.name}</p>
                      <p className="text-xs opacity-80">{formatFileSize(preview.size)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setDescription('');
            setImages([]);
            setPreviewImages([]);
            setError(null);
          }}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            darkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          } border ${
            darkMode ? 'border-slate-600' : 'border-slate-200'
          }`}
          disabled={loading}
        >
          Clear Form
        </button>
        
        <button
          type="submit"
          className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105'
          } text-white shadow-md flex items-center space-x-2`}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Creating Project...</span>
            </>
          ) : (
            <>
              <FaPlus className="text-sm" />
              <span>Create Project</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;