'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Student, Result, Score } from '@/types';

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<Result[]>([]);
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
      const response = await fetch(`/api/results?studentId=${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setResults([data]); // Convert to array for mapping
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!student) {
    return <div className="text-center">Student not found</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {student.name}</p>
      </div>

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
                    {result.scores.filter((s) => s.grade === 'A').length}
                  </div>
                  <div>
                    <span className="text-gray-600">B's:</span>{' '}
                    {result.scores.filter((s) => s.grade === 'B').length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No results available yet</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <a
            href="/students/results"
            className="btn-primary inline-block"
          >
            View All Results
          </a>
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