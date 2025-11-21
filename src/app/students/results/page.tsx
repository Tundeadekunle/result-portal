'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultCard from '@/components/students/ResultCard';
import ResultTable from '@/components/students/ResultTable';

interface Result {
  student: any;
  scores: any[];
  overallAverage: number;
  term: string;
  academicYear: string;
  position?: number;
}

export default function StudentResults() {
  const [studentId, setStudentId] = useState('');
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [term, setTerm] = useState('First Term');
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const terms = ['First Term', 'Second Term', 'Third Term'];

  const fetchResults = async () => {
    if (!studentId.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/results?studentId=${studentId}&academicYear=${academicYear}&term=${term}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Student not found or no results available for the selected period');
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Error fetching results');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Results</h1>
      
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g., ADM20250001"
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && fetchResults()}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="input-field"
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="input-field"
            >
              {terms.map((termOption) => (
                <option key={termOption} value={termOption}>
                  {termOption}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={fetchResults}
              disabled={loading || !studentId.trim()}
              className="btn-primary bg-green-600 hover:bg-green-700 w-full"
            >
              {loading ? 'Loading...' : 'View Results'}
            </button>
          </div>
        </div>
      </div>

      {results && (
        <>
          <ResultCard result={results} />
          <ResultTable scores={results.scores} />
          
          <div className="mt-6 flex justify-center print:hidden">
            <button
              onClick={downloadPDF}
              className="btn-primary bg-purple-600 hover:bg-purple-700"
            >
              Download Result PDF
            </button>
          </div>
        </>
      )}

      {!results && (
        <div className="card text-center">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mb-2">Enter your Student ID and select academic period to view your results</p>
            <p className="text-sm">Students: Use your admission number (e.g., ADM20250001) and password to login</p>
          </div>
        </div>
      )}
    </div>
  );
}