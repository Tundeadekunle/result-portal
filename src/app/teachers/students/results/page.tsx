'use client';

import { useState } from 'react';
import ResultCard from '@/components/students/ResultCard';
import ResultTable from '@/components/students/ResultTable';
import { Result } from '@/types';

export default function StudentResults() {
  const [studentId, setStudentId] = useState('');
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!studentId.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/results?studentId=${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        alert('Student not found or no results available');
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
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g., STU001"
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && fetchResults()}
            />
          </div>
          <button
            onClick={fetchResults}
            disabled={loading || !studentId.trim()}
            className="btn-primary bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Loading...' : 'View Results'}
          </button>
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
            <p>Enter your Student ID to view your results</p>
          </div>
        </div>
      )}
    </div>
  );
}