import Link from 'next/link';

export default function TeachersPage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Portal</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Access tools to manage student scores, view class performance, and generate reports.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/teachers/dashboard" className="card hover:shadow-lg transition-shadow text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Input Scores</h3>
          <p className="text-gray-600">
            Enter and manage student CA test scores and exam results.
          </p>
        </Link>
        
        <Link href="/teachers/students" className="card hover:shadow-lg transition-shadow text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">View Students</h3>
          <p className="text-gray-600">
            Browse student lists and check individual performance.
          </p>
        </Link>
      </div>
      
      <div className="mt-12 card max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/teachers/dashboard" className="btn-primary text-center">
            Input Scores
          </Link>
          <Link href="/teachers/students" className="btn-secondary text-center">
            View Students
          </Link>
          <Link href="/login" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-center">
            Teacher Login
          </Link>
        </div>
      </div>
    </div>
  );
}