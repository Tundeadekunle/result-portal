// 'use client';

// import { useState, useEffect } from 'react';
// import AddStudentForm from './AddStudentForm';

// interface Student {
//   id: string;
//   studentId: string;
//   name: string;
//   email: string;
//   class: string;
//   subjects: string[];
//   admissionDate: string;
// }

// interface StudentManagementProps {
//   teacherId: string;
//   teacherClasses: string[];
//   teacherSubjects: string[];
// }

// export default function StudentManagement({
//   teacherId,
//   teacherClasses,
//   teacherSubjects,
// }: StudentManagementProps) {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(`/api/students?teacherId=${teacherId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data);
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStudentAdded = () => {
//     fetchStudents();
//     setShowAddForm(false);
//   };

//   const downloadStudentCredentials = async () => {
//     try {
//       const response = await fetch(`/api/students/credentials?teacherId=${teacherId}`);
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = `student-credentials-${new Date().toISOString().split('T')[0]}.csv`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error('Error downloading credentials:', error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center">Loading students...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">Student Management</h2>
//           <p className="text-gray-600">Manage your students and their admission details</p>
//         </div>
//         <div className="flex gap-4">
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="btn-primary"
//           >
//             {showAddForm ? 'Cancel' : 'Add New Student'}
//           </button>
//           <button
//             onClick={downloadStudentCredentials}
//             className="btn-secondary bg-green-600 hover:bg-green-700"
//           >
//             Download Credentials
//           </button>
//         </div>
//       </div>

//       {showAddForm && (
//         <AddStudentForm
//           teacherId={teacherId}
//           teacherClasses={teacherClasses}
//           teacherSubjects={teacherSubjects}
//           onStudentAdded={handleStudentAdded}
//         />
//       )}

//       <div className="card">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           Your Students ({students.length})
//         </h3>
        
//         {students.length === 0 ? (
//           <div className="text-center text-gray-500 py-8">
//             <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//             </svg>
//             <p>No students added yet. Click "Add New Student" to get started.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Admission No.
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Class
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Subjects
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Admission Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {students.map((student) => (
//                   <tr key={student.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-blue-600">{student.studentId}</div>
//                       <div className="text-sm text-gray-500">Password: password</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {student.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {student.class}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <div className="flex flex-wrap gap-1">
//                         {student.subjects.map(subject => (
//                           <span
//                             key={subject}
//                             className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
//                           >
//                             {subject}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {new Date(student.admissionDate).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <h4 className="font-semibold text-blue-800 mb-2">Student Login Instructions</h4>
//         <p className="text-blue-700 text-sm">
//           Students can login using their <strong>Admission Number</strong> as username 
//           and the default password <strong>"password"</strong>. They should change their 
//           password after first login.
//         </p>
//       </div>
//     </div>
//   );
// }















// // In the AddStudentForm component, update the subjects section to use teacherSubjects:
// // <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
// //   {teacherSubjects.map(subject => (
// //     <label key={subject} className="flex items-center space-x-2">
// //       <input
// //         type="checkbox"
// //         checked={formData.subjects.includes(subject)}
// //         onChange={() => toggleSubject(subject)}
// //         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //       />
// //       <span className="text-sm text-gray-700">{subject}</span>
// //     </label>
// //   ))}
// // </div>
// // {teacherSubjects.length === 0 && (
// //   <p className="text-sm text-red-600 mt-1">
// //     No subjects available. Please add subjects in the "Manage Subjects" tab first.
// //   </p>
// // )}








'use client';

import { useState, useEffect } from 'react';
import AddStudentForm from './AddStudentForm';

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  class: string;
  subjects: string[];
  admissionDate: string;
}

interface StudentManagementProps {
  teacherId: string;
  teacherClasses: string[];
  teacherSubjects: string[]; // Receive subjects as prop
}

export default function StudentManagement({
  teacherId,
  teacherClasses,
  teacherSubjects,
}: StudentManagementProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students?teacherId=${teacherId}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = () => {
    fetchStudents();
    setShowAddForm(false);
  };

  const downloadStudentCredentials = async () => {
    try {
      const response = await fetch(`/api/students/credentials?teacherId=${teacherId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `student-credentials-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading credentials:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Student Management</h2>
          <p className="text-gray-600">Manage your students and their admission details</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
            disabled={teacherSubjects.length === 0}
          >
            {showAddForm ? 'Cancel' : 'Add New Student'}
          </button>
          <button
            onClick={downloadStudentCredentials}
            className="btn-secondary bg-green-600 hover:bg-green-700"
            disabled={students.length === 0}
          >
            Download Credentials
          </button>
        </div>
      </div>

      {teacherSubjects.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            <strong>Note:</strong> You need to add subjects before you can add students. 
            Go to the "Manage Subjects" tab to add your teaching subjects first.
          </p>
        </div>
      )}

      {showAddForm && (
        <AddStudentForm
          teacherId={teacherId}
          teacherClasses={teacherClasses}
          teacherSubjects={teacherSubjects}
          onStudentAdded={handleStudentAdded}
        />
      )}

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Students ({students.length})
        </h3>
        
        {students.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p>No students added yet. Click "Add New Student" to get started.</p>
            {teacherSubjects.length === 0 && (
              <p className="text-sm text-red-600 mt-2">
                You need to add subjects first in the "Manage Subjects" tab.
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{student.studentId}</div>
                      <div className="text-sm text-gray-500">Password: password</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.map(subject => (
                          <span
                            key={subject}
                            className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(student.admissionDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Student Login Instructions</h4>
        <p className="text-blue-700 text-sm">
          Students can login using their <strong>Admission Number</strong> as username 
          and the default password <strong>"password"</strong>. They should change their 
          password after first login.
        </p>
      </div>
    </div>
  );
}