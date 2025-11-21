'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'STUDENT') {
      router.push('/login');
      return;
    }

    fetchStudentData(userData.id);
  }, [router]);

  const fetchStudentData = async (userId: string) => {
    try {
      const response = await fetch(`/api/students?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
        fetchStudentResults(data.id);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentResults = async (studentId: string) => {
    try {
      // Fetch results for the current academic year (2025/2026)
      const response = await fetch(`/api/results?studentId=${studentId}&academicYear=2025/2026&term=First Term`);
      if (response.ok) {
        const data = await response.json();
        setResults([data]); // Convert to array for mapping
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('student');
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

  if (!student) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Not Found</h2>
        <p className="text-gray-600 mb-4">Unable to load your student information.</p>
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
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {student.name}</p>
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
          <div className="text-2xl font-bold text-blue-600">{student.class}</div>
          <div className="text-sm text-gray-600">Class</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{student.subjects.length}</div>
          <div className="text-sm text-gray-600">Subjects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{student.studentId}</div>
          <div className="text-sm text-gray-600">Student ID</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">
            {results[0]?.overallAverage ? `${results[0].overallAverage.toFixed(1)}%` : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Current Average</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/students/results" className="card hover:shadow-lg transition-shadow text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">View Results</h3>
          <p className="text-gray-600">
            Check your latest results and academic performance by term and year.
          </p>
        </Link>

        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance</h3>
          <p className="text-gray-600 mb-4">
            Track your academic progress and improvement over time.
          </p>
          <button className="btn-secondary w-full" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {/* Recent Results */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Results</h2>
        
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {result.term} {result.academicYear}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.overallAverage >= 80 ? 'bg-green-100 text-green-800' :
                    result.overallAverage >= 60 ? 'bg-blue-100 text-blue-800' :
                    result.overallAverage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Average: {result.overallAverage.toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Position:</span>{' '}
                    {result.position ? `${result.position}${getOrdinal(result.position)}` : 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-600">Subjects:</span> {result.scores.length}
                  </div>
                  <div>
                    <span className="text-gray-600">A's:</span>{' '}
                    {result.scores.filter((s: any) => s.grade === 'A').length}
                  </div>
                  <div>
                    <span className="text-gray-600">B's:</span>{' '}
                    {result.scores.filter((s: any) => s.grade === 'B').length}
                  </div>
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {result.scores.slice(0, 4).map((score: any) => (
                    <span
                      key={score.id}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        score.grade === 'A' ? 'bg-green-100 text-green-800' :
                        score.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        score.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        score.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                        score.grade === 'E' ? 'bg-orange-500 text-orange-900' :
                        score.grade === 'F' ? 'bg-red-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {score.subject}: {score.grade}
                    </span>
                  ))}
                  {result.scores.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{result.scores.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mb-4">No results available yet for the current term</p>
            <Link href="/students/results" className="btn-primary inline-block">
              Check All Results
            </Link>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link
            href="/students/results"
            className="btn-primary inline-block"
          >
            View All Results
          </Link>
        </div>
      </div>

      {/* Student Information */}
      <div className="card mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Full Name:</strong> {student.name}
          </div>
          <div>
            <strong>Student ID:</strong> {student.studentId}
          </div>
          <div>
            <strong>Class:</strong> {student.class}
          </div>
          <div>
            <strong>Email:</strong> {student.email}
          </div>
          <div className="md:col-span-2">
            <strong>Subjects:</strong>{' '}
            <div className="flex flex-wrap gap-1 mt-1">
              {student.subjects.map((subject: string) => (
                <span
                  key={subject}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}