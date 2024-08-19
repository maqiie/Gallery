
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
//     <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
//       <h2 className="text-4xl font-semibold mb-6 text-center text-blue-800">Create Project</h2>
//       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//       <div className="mb-6">
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="title">
//           Project Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="description">
//           Project Description
//         </label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
//           required
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="images">
//           Upload Images
//         </label>
//         <input
//           type="file"
//           id="images"
//           multiple
//           onChange={handleImageChange}
//           className="w-full p-4 border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:border-blue-500"
//         />
//       </div>
//       <button
//         type="submit"
//         className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('project[title]', title);
      formData.append('project[description]', description);
      images.forEach((image) => formData.append('project[images][]', image));

      const response = await createProject(formData);
      onProjectCreated(response);
      setTitle('');
      setDescription('');
      setImages([]);
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">Create Project</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <div className="mb-6">
        <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="title">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="description">
          Project Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows="4"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-lg font-medium mb-2" htmlFor="images">
          Upload Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="w-full p-4 border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
