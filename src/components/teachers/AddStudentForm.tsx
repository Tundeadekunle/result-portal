// 'use client';

// import { useState } from 'react';

// interface AddStudentFormProps {
//   teacherId: string;
//   teacherClasses: string[];
//   teacherSubjects: string[];
//   onStudentAdded: () => void;
// }

// export default function AddStudentForm({
//   teacherId,
//   teacherClasses,
//   teacherSubjects,
//   onStudentAdded,
// }: AddStudentFormProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     class: '',
//     subjects: [] as string[],
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/students', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           teacherId,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(`Student added successfully! Admission Number: ${data.student.studentId}`);
//         setFormData({ name: '', class: '', subjects: [] });
//         onStudentAdded();
//       } else {
//         const errorData = await response.json();
//         setMessage(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Error adding student:', error);
//       setMessage('Error adding student');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSubject = (subject: string) => {
//     setFormData(prev => ({
//       ...prev,
//       subjects: prev.subjects.includes(subject)
//         ? prev.subjects.filter(s => s !== subject)
//         : [...prev.subjects, subject],
//     }));
//   };

//   return (
//     <div className="card">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Student</h3>
      
//       {message && (
//         <div className={`p-3 rounded mb-4 ${
//           message.includes('Error') 
//             ? 'bg-red-100 border border-red-400 text-red-700'
//             : 'bg-green-100 border border-green-400 text-green-700'
//         }`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Student Name *
//           </label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="input-field"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Class *
//           </label>
//           <select
//             value={formData.class}
//             onChange={(e) => setFormData({ ...formData, class: e.target.value })}
//             className="input-field"
//             required
//           >
//             <option value="">Select Class</option>
//             {teacherClasses.map(className => (
//               <option key={className} value={className}>
//                 {className}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Subjects *
//           </label>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {teacherSubjects.map(subject => (
//               <label key={subject} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.subjects.includes(subject)}
//                   onChange={() => toggleSubject(subject)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-700">{subject}</span>
//               </label>
//             ))}
//           </div>
//           {formData.subjects.length === 0 && (
//             <p className="text-sm text-red-600 mt-1">Please select at least one subject</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading || formData.subjects.length === 0}
//           className="btn-primary"
//         >
//           {loading ? 'Adding Student...' : 'Add Student'}
//         </button>
//       </form>
//     </div>
//   );
// }













'use client';

import { useState } from 'react';

interface AddStudentFormProps {
  teacherId: string;
  teacherClasses: string[];
  teacherSubjects: string[];
  onStudentAdded: () => void;
}

export default function AddStudentForm({
  teacherId,
  teacherClasses,
  teacherSubjects,
  onStudentAdded,
}: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    subjects: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.subjects.length === 0) {
      setMessage('Please select at least one subject');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teacherId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Student added successfully! Admission Number: ${data.student.studentId}`);
        setFormData({ name: '', class: '', subjects: [] });
        onStudentAdded();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage('Error adding student');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const selectAllSubjects = () => {
    setFormData(prev => ({
      ...prev,
      subjects: teacherSubjects,
    }));
  };

  const clearAllSubjects = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [],
    }));
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Student</h3>
      
      {message && (
        <div className={`p-3 rounded mb-4 ${
          message.includes('Error') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class *
          </label>
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Class</option>
            {teacherClasses.map(className => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Subjects *
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllSubjects}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAllSubjects}
                className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {teacherSubjects.map(subject => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => toggleSubject(subject)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{subject}</span>
              </label>
            ))}
          </div>
          {formData.subjects.length === 0 && (
            <p className="text-sm text-red-600 mt-1">Please select at least one subject</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Selected: {formData.subjects.length} of {teacherSubjects.length} subjects
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || formData.subjects.length === 0}
          className="btn-primary"
        >
          {loading ? 'Adding Student...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
}