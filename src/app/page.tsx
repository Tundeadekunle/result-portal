// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">
//         Welcome to Student Result Management System
//       </h1>
//       <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
//         A comprehensive platform for teachers to manage student scores and for students to access their results efficiently.
//       </p>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//         <div className="card text-center">
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">For Teachers</h3>
//           <p className="text-gray-600 mb-4">
//             Input CA test scores, exam results, and manage student performance data.
//           </p>
//           <Link href="/teachers" className="btn-primary inline-block">
//             Teacher Portal
//           </Link>
//         </div>
        
//         <div className="card text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">For Students</h3>
//           <p className="text-gray-600 mb-4">
//             View your results, check performance, and download score reports.
//           </p>
//           <Link href="/students" className="btn-primary inline-block bg-green-600 hover:bg-green-700">
//             Student Portal
//           </Link>
//         </div>
        
//         <div className="card text-center">
//           <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Stats</h3>
//           <div className="text-gray-600 space-y-2">
//             <p>200+ Students</p>
//             <p>20+ Teachers</p>
//             <p>Multiple Classes</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Mathal Int'l School Student Result Portal
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        A comprehensive platform for teachers to manage student scores and for students to access their results efficiently.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">For Teachers</h3>
          <p className="text-gray-600 mb-4">
            Register your account, manage students, and input scores.
          </p>
          <div className="space-y-2">
            <Link href="/register/teacher" className="btn-primary inline-block w-full">
              Teacher Registration
            </Link>
            <Link href="/teachers" className="btn-secondary inline-block w-full">
              Teacher Portal
            </Link>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">For Students</h3>
          <p className="text-gray-600 mb-4">
            Access your results using admission number provided by your teacher.
          </p>
          <Link href="/students" className="btn-primary inline-block bg-green-600 hover:bg-green-700 w-full">
            Student Portal
          </Link>
        </div>
        
        <div className="card text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Stats</h3>
          <div className="text-gray-600 space-y-2">
            <p>Students Capacity</p>
            <p>Teachers Capacity</p>
            <p>Multiple Classes</p>
            {/* <p>Automatic Admission Numbers</p> */}
          </div>
        </div>
      </div>

      <div className="mt-12 card max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <p><strong>Teachers Register</strong> and set up their profile</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-green-600">2</span>
            </div>
            <p><strong>Add Students</strong> with auto-generated admission numbers</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-purple-600">3</span>
            </div>
            <p><strong>Students Login</strong> with admission number to view results</p>
          </div>
        </div>
      </div>
    </div>
  );
}