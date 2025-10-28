// import React, { useState } from 'react';

// export default function TicketModalForm({ onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'Pending',
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description) return;
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
//           Create New Ticket
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter ticket title"
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe the issue..."
//               className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             >
//                 <option value="open">Open</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="closed">Closed</option>
//             </select>
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               Create Ticket
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

export default function TicketModalForm({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
  });

  const [error, setError] = useState('');

  // Prefill form data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('All fields are required.');
      return;
    }

    onSubmit(formData);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          {isEditing ? 'Edit Ticket' : 'Create New Ticket'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? 'Update Ticket' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
