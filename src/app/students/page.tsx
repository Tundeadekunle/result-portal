import Link from 'next/link';

export default function StudentsPage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Portal</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Access your results, track your academic progress, and download score reports.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/students/results" className="card hover:shadow-lg transition-shadow text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">View Results</h3>
          <p className="text-gray-600">
            Check your latest results and academic performance by term and academic year.
          </p>
        </Link>
        
        <Link href="/students/dashboard" className="card hover:shadow-lg transition-shadow text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Dashboard</h3>
          <p className="text-gray-600">
            Access your personal dashboard with overview of your academic performance.
          </p>
        </Link>
      </div>
      
      <div className="mt-12 card max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/students/results" className="btn-primary text-center bg-green-600 hover:bg-green-700">
            View Results
          </Link>
          <Link href="/login" className="btn-secondary text-center">
            Student Login
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Access Your Results</h3>
        <ol className="text-left text-blue-700 text-sm space-y-2">
          <li>1. Use your <strong>Admission Number</strong> as username (e.g., ADM20250001)</li>
          <li>2. Use the default password: <strong>password</strong></li>
          <li>3. After login, you can view results by academic year and term</li>
          <li>4. Download your results as PDF for printing</li>
        </ol>
      </div>
    </div>
  );
}