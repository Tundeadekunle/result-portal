// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import ScoreForm from '@/components/teachers/ScoreForm';

// // // export default function TeachersDashboard() {
// // //   const [teacher, setTeacher] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     const user = localStorage.getItem('user');

// // //     if (!token || !user) {
// // //       router.push('/login');
// // //       return;
// // //     }

// // //     const userData = JSON.parse(user);
// // //     if (userData.role !== 'TEACHER') {
// // //       router.push('/login');
// // //       return;
// // //     }

// // //     fetchTeacherData(userData.id);
// // //   }, [router]);

// // //   const fetchTeacherData = async (userId: string) => {
// // //     try {
// // //       const response = await fetch(`/api/teachers?userId=${userId}`);
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setTeacher(data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching teacher data:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center">Loading...</div>;
// // //   }

// // //   if (!teacher) {
// // //     return <div className="text-center">Teacher not found</div>;
// // //   }

// // //   return (
// // //     <div>
// // //       <div className="mb-6">
// // //         <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
// // //         <p className="text-gray-600">Welcome back, {teacher.name}</p>
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
// // //         <div className="card text-center">
// // //           <div className="text-2xl font-bold text-blue-600">{teacher.subjects.length}</div>
// // //           <div className="text-sm text-gray-600">Subjects</div>
// // //         </div>
// // //         <div className="card text-center">
// // //           <div className="text-2xl font-bold text-green-600">{teacher.classes.length}</div>
// // //           <div className="text-sm text-gray-600">Classes</div>
// // //         </div>
// // //         <div className="card text-center">
// // //           <div className="text-2xl font-bold text-purple-600">200+</div>
// // //           <div className="text-sm text-gray-600">Students</div>
// // //         </div>
// // //       </div>

// // //       <div className="card">
// // //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Input Student Scores</h2>
// // //         <ScoreForm teacherId={teacher.id} />
// // //       </div>
// // //     </div>
// // //   );
// // // }












// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import ScoreForm from '@/components/teachers/ScoreForm';
// // import StudentManagement from '@/components/teachers/StudentManagement';

// // export default function TeachersDashboard() {
// //   const [teacher, setTeacher] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState<'scores' | 'students'>('scores');
// //   const router = useRouter();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     const user = localStorage.getItem('user');

// //     if (!token || !user) {
// //       router.push('/login');
// //       return;
// //     }

// //     const userData = JSON.parse(user);
// //     if (userData.role !== 'TEACHER') {
// //       router.push('/login');
// //       return;
// //     }

// //     fetchTeacherData(userData.id);
// //   }, [router]);

// //   const fetchTeacherData = async (userId: string) => {
// //     try {
// //       const response = await fetch(`/api/teachers?userId=${userId}`);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setTeacher(data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching teacher data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     router.push('/');
// //   };

// //   if (loading) {
// //     return <div className="text-center">Loading...</div>;
// //   }

// //   if (!teacher) {
// //     return <div className="text-center">Teacher not found</div>;
// //   }

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
// //           <p className="text-gray-600">Welcome back, {teacher.name}</p>
// //         </div>
// //         <button
// //           onClick={logout}
// //           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 lg:grid-4 gap-6 mb-8">
// //         <div className="card text-center">
// //           <div className="text-2xl font-bold text-blue-600">{teacher.subjects.length}</div>
// //           <div className="text-sm text-gray-600">Subjects</div>
// //         </div>
// //         <div className="card text-center">
// //           <div className="text-2xl font-bold text-green-600">{teacher.classes.length}</div>
// //           <div className="text-sm text-gray-600">Classes</div>
// //         </div>
// //         <div className="card text-center">
// //           <div className="text-2xl font-bold text-purple-600">
// //             {teacher._count?.students || 0}
// //           </div>
// //           <div className="text-sm text-gray-600">Students</div>
// //         </div>
// //         <div className="card text-center">
// //           <div className="text-2xl font-bold text-orange-600">
// //             {teacher._count?.scores || 0}
// //           </div>
// //           <div className="text-sm text-gray-600">Scores Entered</div>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="card">
// //         <div className="border-b">
// //           <nav className="flex space-x-4">
// //             <button
// //               onClick={() => setActiveTab('scores')}
// //               className={`px-4 py-2 rounded-t ${
// //                 activeTab === 'scores'
// //                   ? 'bg-blue-600 text-white'
// //                   : 'text-gray-600 hover:text-gray-900'
// //               }`}
// //             >
// //               Input Scores
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('students')}
// //               className={`px-4 py-2 rounded-t ${
// //                 activeTab === 'students'
// //                   ? 'bg-blue-600 text-white'
// //                   : 'text-gray-600 hover:text-gray-900'
// //               }`}
// //             >
// //               Manage Students
// //             </button>
// //           </nav>
// //         </div>
        
// //         <div className="p-6">
// //           {activeTab === 'scores' && <ScoreForm teacherId={teacher.id} />}
// //           {activeTab === 'students' && (
// //             <StudentManagement
// //               teacherId={teacher.id}
// //               teacherClasses={teacher.classes}
// //               teacherSubjects={teacher.subjects}
// //             />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



















// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import ScoreForm from '@/components/teachers/ScoreForm';
// import StudentManagement from '@/components/teachers/StudentManagement';
// import SubjectManagement from '@/components/teachers/SubjectManagement';

// export default function TeachersDashboard() {
//   const [teacher, setTeacher] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'scores' | 'students' | 'subjects'>('scores');
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');

//     if (!token || !user) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(user);
//     if (userData.role !== 'TEACHER') {
//       router.push('/login');
//       return;
//     }

//     fetchTeacherData(userData.id);
//   }, [router]);

//   const fetchTeacherData = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/teachers?userId=${userId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setTeacher(data);
//       }
//     } catch (error) {
//       console.error('Error fetching teacher data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubjectsUpdate = (updatedSubjects: string[]) => {
//     if (teacher) {
//       setTeacher({
//         ...teacher,
//         subjects: updatedSubjects,
//       });
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('teacher');
//     router.push('/');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!teacher) {
//     return (
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Teacher Not Found</h2>
//         <p className="text-gray-600 mb-4">Unable to load your teacher information.</p>
//         <button
//           onClick={() => router.push('/login')}
//           className="btn-primary"
//         >
//           Login Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
//           <p className="text-gray-600">Welcome back, {teacher.name}</p>
//         </div>
//         <button
//           onClick={logout}
//           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//         <div className="card text-center">
//           <div className="text-2xl font-bold text-blue-600">{teacher.subjects.length}</div>
//           <div className="text-sm text-gray-600">Subjects</div>
//         </div>
//         <div className="card text-center">
//           <div className="text-2xl font-bold text-green-600">{teacher.classes.length}</div>
//           <div className="text-sm text-gray-600">Classes</div>
//         </div>
//         <div className="card text-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {teacher._count?.students || 0}
//           </div>
//           <div className="text-sm text-gray-600">Students</div>
//         </div>
//         <div className="card text-center">
//           <div className="text-2xl font-bold text-orange-600">
//             {teacher._count?.scores || 0}
//           </div>
//           <div className="text-sm text-gray-600">Scores Entered</div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="card">
//         <div className="border-b">
//           <nav className="flex space-x-4">
//             <button
//               onClick={() => setActiveTab('scores')}
//               className={`px-4 py-2 rounded-t ${
//                 activeTab === 'scores'
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Input Scores
//             </button>
//             <button
//               onClick={() => setActiveTab('students')}
//               className={`px-4 py-2 rounded-t ${
//                 activeTab === 'students'
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Manage Students
//             </button>
//             <button
//               onClick={() => setActiveTab('subjects')}
//               className={`px-4 py-2 rounded-t ${
//                 activeTab === 'subjects'
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Manage Subjects
//             </button>
//           </nav>
//         </div>
        
//         <div className="p-6">
//           {activeTab === 'scores' && <ScoreForm teacherId={teacher.id} />}
//           {activeTab === 'students' && (
//             <StudentManagement
//               teacherId={teacher.id}
//               teacherClasses={teacher.classes}
//               teacherSubjects={teacher.subjects}
//             />
//           )}
//           {activeTab === 'subjects' && (
//             <SubjectManagement
//               teacherId={teacher.id}
//               currentSubjects={teacher.subjects}
//               onSubjectsUpdate={handleSubjectsUpdate}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

















'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScoreForm from '@/components/teachers/ScoreForm';
import StudentManagement from '@/components/teachers/StudentManagement';
import SubjectManagement from '@/components/teachers/SubjectManagement';

export default function TeachersDashboard() {
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'scores' | 'students' | 'subjects'>('scores');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'TEACHER') {
      router.push('/login');
      return;
    }

    fetchTeacherData(userData.id);
  }, [router]);

  const fetchTeacherData = async (userId: string) => {
    try {
      const response = await fetch(`/api/teachers?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTeacher(data);
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectsUpdate = (updatedSubjects: string[]) => {
    if (teacher) {
      const updatedTeacher = {
        ...teacher,
        subjects: updatedSubjects,
      };
      setTeacher(updatedTeacher);
      
      // Update localStorage
      localStorage.setItem('teacher', JSON.stringify(updatedTeacher));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('teacher');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Teacher Not Found</h2>
        <p className="text-gray-600 mb-4">Unable to load your teacher information.</p>
        <button
          onClick={() => router.push('/login')}
          className="btn-primary"
        >
          Login Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back, {teacher.name}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{teacher.subjects.length}</div>
          <div className="text-sm text-gray-600">Subjects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{teacher.classes.length}</div>
          <div className="text-sm text-gray-600">Classes</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {teacher._count?.students || 0}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">
            {teacher._count?.scores || 0}
          </div>
          <div className="text-sm text-gray-600">Scores Entered</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('scores')}
              className={`px-4 py-2 rounded-t ${
                activeTab === 'scores'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Input Scores
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-t ${
                activeTab === 'students'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manage Students
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-t ${
                activeTab === 'subjects'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manage Subjects
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'scores' && (
            <ScoreForm 
              teacherId={teacher.id} 
              teacherSubjects={teacher.subjects} // Pass subjects directly
            />
          )}
          {activeTab === 'students' && (
            <StudentManagement
              teacherId={teacher.id}
              teacherClasses={teacher.classes}
              teacherSubjects={teacher.subjects}
            />
          )}
          {activeTab === 'subjects' && (
            <SubjectManagement
              teacherId={teacher.id}
              currentSubjects={teacher.subjects}
              onSubjectsUpdate={handleSubjectsUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}