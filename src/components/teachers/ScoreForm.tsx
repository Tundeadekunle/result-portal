// // // 'use client';

// // // import { useState, useEffect } from 'react';

// // // interface ScoreFormProps {
// // //   teacherId: string;
// // // }

// // // export default function ScoreForm({ teacherId }: ScoreFormProps) {
// // //   const [formData, setFormData] = useState({
// // //     studentId: '',
// // //     subject: '',
// // //     caScore: '',
// // //     examScore: '',
// // //     term: '',
// // //     academicYear: '',
// // //   });

// // //   const [students, setStudents] = useState<any[]>([]);
// // //   const [subjects] = useState(['Mathematics', 'English', 'Science', 'Social Studies', 'Physics', 'Chemistry', 'Biology']);
// // //   const [terms] = useState(['First Term', 'Second Term', 'Third Term']);
// // //   const [academicYears] = useState(['2023/2024', '2024/2025']);

// // //   useEffect(() => {
// // //     fetchStudents();
// // //   }, []);

// // //   const fetchStudents = async () => {
// // //     try {
// // //       const response = await fetch('/api/students');
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setStudents(data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching students:', error);
// // //     }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     const scoreData = {
// // //       ...formData,
// // //       caScore: parseInt(formData.caScore),
// // //       examScore: parseInt(formData.examScore),
// // //       teacherId,
// // //     };

// // //     try {
// // //       const response = await fetch('/api/scores', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(scoreData),
// // //       });

// // //       if (response.ok) {
// // //         alert('Score submitted successfully!');
// // //         setFormData({
// // //           studentId: '',
// // //           subject: '',
// // //           caScore: '',
// // //           examScore: '',
// // //           term: formData.term,
// // //           academicYear: formData.academicYear,
// // //         });
// // //       } else {
// // //         alert('Error submitting score');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error submitting score:', error);
// // //       alert('Error submitting score');
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Student
// // //           </label>
// // //           <select
// // //             value={formData.studentId}
// // //             onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           >
// // //             <option value="">Select Student</option>
// // //             {students.map((student) => (
// // //               <option key={student.id} value={student.id}>
// // //                 {student.name} ({student.studentId}) - {student.class}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Subject
// // //           </label>
// // //           <select
// // //             value={formData.subject}
// // //             onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           >
// // //             <option value="">Select Subject</option>
// // //             {subjects.map((subject) => (
// // //               <option key={subject} value={subject}>
// // //                 {subject}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             CA Test Score (0-40)
// // //           </label>
// // //           <input
// // //             type="number"
// // //             min="0"
// // //             max="30"
// // //             value={formData.caScore}
// // //             onChange={(e) => setFormData({ ...formData, caScore: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Exam Score (0-60)
// // //           </label>
// // //           <input
// // //             type="number"
// // //             min="0"
// // //             max="70"
// // //             value={formData.examScore}
// // //             onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Term
// // //           </label>
// // //           <select
// // //             value={formData.term}
// // //             onChange={(e) => setFormData({ ...formData, term: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           >
// // //             <option value="">Select Term</option>
// // //             {terms.map((term) => (
// // //               <option key={term} value={term}>
// // //                 {term}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Academic Year
// // //           </label>
// // //           <select
// // //             value={formData.academicYear}
// // //             onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
// // //             className="input-field"
// // //             required
// // //           >
// // //             <option value="">Select Academic Year</option>
// // //             {academicYears.map((year) => (
// // //               <option key={year} value={year}>
// // //                 {year}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         className="btn-primary"
// // //       >
// // //         Submit Score
// // //       </button>
// // //     </form>
// // //   );
// // // }























// // 'use client';

// // import { useState, useEffect } from 'react';

// // interface ScoreFormProps {
// //   teacherId: string;
// // }

// // export default function ScoreForm({ teacherId }: ScoreFormProps) {
// //   const [formData, setFormData] = useState({
// //     studentId: '',
// //     subject: '',
// //     caScore: '',
// //     examScore: '',
// //     term: '',
// //     academicYear: '2025/2026', // Set default to 2025/2026
// //   });

// //   const [students, setStudents] = useState<any[]>([]);
// //   const [subjects] = useState(['Mathematics', 'English', 'Science', 'Social Studies', 'Physics', 'Chemistry', 'Biology']);
// //   const [terms] = useState(['First Term', 'Second Term', 'Third Term']);
  
// //   // Generate academic years from 2025/2026 upward
// //   const academicYears = (() => {
// //     const years = [];
// //     const currentYear = new Date().getFullYear();
// //     const startYear = 2025;
// //     const endYear = Math.max(currentYear + 5, 2030); // Show up to 5 years from now, minimum 2030
    
// //     for (let year = startYear; year <= endYear; year++) {
// //       years.push(`${year}/${year + 1}`);
// //     }
// //     return years;
// //   })();

// //   useEffect(() => {
// //     fetchStudents();
// //   }, []);

// //   const fetchStudents = async () => {
// //     try {
// //       const response = await fetch('/api/students');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setStudents(data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching students:', error);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     const scoreData = {
// //       ...formData,
// //       caScore: parseInt(formData.caScore),
// //       examScore: parseInt(formData.examScore),
// //       teacherId,
// //     };

// //     try {
// //       const response = await fetch('/api/scores', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(scoreData),
// //       });

// //       if (response.ok) {
// //         alert('Score submitted successfully!');
// //         setFormData({
// //           studentId: '',
// //           subject: '',
// //           caScore: '',
// //           examScore: '',
// //           term: formData.term,
// //           academicYear: '2025/2026', // Reset to 2025/2026
// //         });
// //       } else {
// //         alert('Error submitting score');
// //       }
// //     } catch (error) {
// //       console.error('Error submitting score:', error);
// //       alert('Error submitting score');
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Student
// //           </label>
// //           <select
// //             value={formData.studentId}
// //             onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
// //             className="input-field"
// //             required
// //           >
// //             <option value="">Select Student</option>
// //             {students.map((student) => (
// //               <option key={student.id} value={student.id}>
// //                 {student.name} ({student.studentId}) - {student.class}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Subject
// //           </label>
// //           <select
// //             value={formData.subject}
// //             onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
// //             className="input-field"
// //             required
// //           >
// //             <option value="">Select Subject</option>
// //             {subjects.map((subject) => (
// //               <option key={subject} value={subject}>
// //                 {subject}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             CA Test Score (0-40)
// //           </label>
// //           <input
// //             type="number"
// //             min="0"
// //             max="40"
// //             value={formData.caScore}
// //             onChange={(e) => setFormData({ ...formData, caScore: e.target.value })}
// //             className="input-field"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Exam Score (0-60)
// //           </label>
// //           <input
// //             type="number"
// //             min="0"
// //             max="60"
// //             value={formData.examScore}
// //             onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
// //             className="input-field"
// //             required
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Term
// //           </label>
// //           <select
// //             value={formData.term}
// //             onChange={(e) => setFormData({ ...formData, term: e.target.value })}
// //             className="input-field"
// //             required
// //           >
// //             <option value="">Select Term</option>
// //             {terms.map((term) => (
// //               <option key={term} value={term}>
// //                 {term}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Academic Year
// //           </label>
// //           <select
// //             value={formData.academicYear}
// //             onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
// //             className="input-field"
// //             required
// //           >
// //             <option value="">Select Academic Year</option>
// //             {academicYears.map((year) => (
// //               <option key={year} value={year}>
// //                 {year}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       <button
// //         type="submit"
// //         className="btn-primary"
// //       >
// //         Submit Score
// //       </button>
// //     </form>
// //   );
// // }



















// 'use client';

// import { useState, useEffect } from 'react';

// interface ScoreFormProps {
//   teacherId: string;
// }

// export default function ScoreForm({ teacherId }: ScoreFormProps) {
//   const [formData, setFormData] = useState({
//     studentId: '',
//     subject: '',
//     caScore: '',
//     examScore: '',
//     term: '',
//     academicYear: '2025/2026',
//   });

//   const [students, setStudents] = useState<any[]>([]);
//   const [teacherSubjects, setTeacherSubjects] = useState<string[]>([]);
//   const [terms] = useState(['First Term', 'Second Term', 'Third Term']);
//   const [academicYears] = useState(['2025/2026', '2026/2027', '2027/2028']);

//   useEffect(() => {
//     fetchTeacherData();
//     fetchStudents();
//   }, [teacherId]);

//   const fetchTeacherData = async () => {
//     try {
//       const response = await fetch(`/api/teachers/${teacherId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setTeacherSubjects(data.subjects || []);
//       }
//     } catch (error) {
//       console.error('Error fetching teacher data:', error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(`/api/students?teacherId=${teacherId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data);
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const scoreData = {
//       ...formData,
//       caScore: parseInt(formData.caScore),
//       examScore: parseInt(formData.examScore),
//       teacherId,
//     };

//     try {
//       const response = await fetch('/api/scores', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(scoreData),
//       });

//       if (response.ok) {
//         alert('Score submitted successfully!');
//         setFormData({
//           studentId: '',
//           subject: '',
//           caScore: '',
//           examScore: '',
//           term: formData.term,
//           academicYear: formData.academicYear,
//         });
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || 'Error submitting score');
//       }
//     } catch (error) {
//       console.error('Error submitting score:', error);
//       alert('Error submitting score');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Student
//           </label>
//           <select
//             value={formData.studentId}
//             onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
//             className="input-field"
//             required
//           >
//             <option value="">Select Student</option>
//             {students.map((student) => (
//               <option key={student.id} value={student.id}>
//                 {student.name} ({student.studentId}) - {student.class}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Subject
//           </label>
//           <select
//             value={formData.subject}
//             onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//             className="input-field"
//             required
//           >
//             <option value="">Select Subject</option>
//             {teacherSubjects.map((subject) => (
//               <option key={subject} value={subject}>
//                 {subject}
//               </option>
//             ))}
//           </select>
//           {teacherSubjects.length === 0 && (
//             <p className="text-sm text-red-600 mt-1">
//               No subjects found. Please add subjects in the "Manage Subjects" tab.
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             CA Test Score (0-30)
//           </label>
//           <input
//             type="number"
//             min="0"
//             max="30"
//             value={formData.caScore}
//             onChange={(e) => setFormData({ ...formData, caScore: e.target.value })}
//             className="input-field"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Exam Score (0-70)
//           </label>
//           <input
//             type="number"
//             min="0"
//             max="70"
//             value={formData.examScore}
//             onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
//             className="input-field"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Term
//           </label>
//           <select
//             value={formData.term}
//             onChange={(e) => setFormData({ ...formData, term: e.target.value })}
//             className="input-field"
//             required
//           >
//             <option value="">Select Term</option>
//             {terms.map((term) => (
//               <option key={term} value={term}>
//                 {term}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Academic Year
//           </label>
//           <select
//             value={formData.academicYear}
//             onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
//             className="input-field"
//             required
//           >
//             <option value="">Select Academic Year</option>
//             {academicYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={teacherSubjects.length === 0}
//         className="btn-primary"
//       >
//         Submit Score
//       </button>

//       {teacherSubjects.length === 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//           <p className="text-yellow-800 text-sm">
//             <strong>Note:</strong> You need to add subjects before you can input scores. 
//             Go to the "Manage Subjects" tab to add your teaching subjects.
//           </p>
//         </div>
//       )}
//     </form>
//   );
// }

























'use client';

import { useState, useEffect } from 'react';

interface ScoreFormProps {
  teacherId: string;
  teacherSubjects: string[]; // Receive subjects as prop
}

export default function ScoreForm({ teacherId, teacherSubjects }: ScoreFormProps) {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    caScore: '',
    examScore: '',
    term: '',
    academicYear: '2025/2026',
  });

  const [students, setStudents] = useState<any[]>([]);
  const [terms] = useState(['First Term', 'Second Term', 'Third Term']);
  
  // Generate academic years from 2025/2026 upward
  const academicYears = (() => {
    const years = [];
    const startYear = 2025;
    const endYear = 2030;
    
    for (let year = startYear; year <= endYear; year++) {
      years.push(`${year}/${year + 1}`);
    }
    return years;
  })();

  useEffect(() => {
    fetchStudents();
  }, [teacherId]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students?teacherId=${teacherId}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.studentId || !formData.subject || !formData.term || !formData.academicYear) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.caScore || !formData.examScore) {
      alert('Please enter both CA and Exam scores');
      return;
    }

    const caScore = parseInt(formData.caScore);
    const examScore = parseInt(formData.examScore);

    if (caScore < 0 || caScore > 30) {
      alert('CA Score must be between 0 and 30');
      return;
    }

    if (examScore < 0 || examScore > 70) {
      alert('Exam Score must be between 0 and 70');
      return;
    }

    const scoreData = {
      studentId: formData.studentId,
      subject: formData.subject,
      caScore: caScore,
      examScore: examScore,
      teacherId,
      term: formData.term,
      academicYear: formData.academicYear,
    };

    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });

      if (response.ok) {
        alert('Score submitted successfully!');
        // Reset form but keep term and academic year
        setFormData({
          studentId: '',
          subject: '',
          caScore: '',
          examScore: '',
          term: formData.term,
          academicYear: formData.academicYear,
        });
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error submitting score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Error submitting score');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student *
          </label>
          <select
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.studentId}) - {student.class}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Subject</option>
            {teacherSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {teacherSubjects.length === 0 && (
            <p className="text-sm text-red-600 mt-1">
              No subjects found. Please add subjects in the "Manage Subjects" tab.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CA Test Score (0-40) *
          </label>
          <input
            type="number"
            min="0"
            max="40"
            value={formData.caScore}
            onChange={(e) => setFormData({ ...formData, caScore: e.target.value })}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Score (0-60) *
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={formData.examScore}
            onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Term *
          </label>
          <select
            value={formData.term}
            onChange={(e) => setFormData({ ...formData, term: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year *
          </label>
          <select
            value={formData.academicYear}
            onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Academic Year</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={teacherSubjects.length === 0}
        className="btn-primary"
      >
        Submit Score
      </button>

      {teacherSubjects.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> You need to add subjects before you can input scores. 
            Go to the "Manage Subjects" tab to add your teaching subjects.
          </p>
        </div>
      )}

      {teacherSubjects.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Available Subjects:</strong> {teacherSubjects.join(', ')}
          </p>
        </div>
      )}
    </form>
  );
}