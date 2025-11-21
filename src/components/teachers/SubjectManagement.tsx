'use client';

import { useState } from 'react';

interface SubjectManagementProps {
  teacherId: string;
  currentSubjects: string[];
  onSubjectsUpdate: (subjects: string[]) => void;
}

export default function SubjectManagement({
  teacherId,
  currentSubjects,
  onSubjectsUpdate,
}: SubjectManagementProps) {
  const [subjects, setSubjects] = useState<string[]>(currentSubjects);
  const [newSubject, setNewSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      const updatedSubjects = [...subjects, newSubject.trim()];
      setSubjects(updatedSubjects);
      setNewSubject('');
      updateTeacherSubjects(updatedSubjects);
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    const updatedSubjects = subjects.filter(subject => subject !== subjectToRemove);
    setSubjects(updatedSubjects);
    updateTeacherSubjects(updatedSubjects);
  };

  const updateTeacherSubjects = async (updatedSubjects: string[]) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/teachers/subjects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId,
          subjects: updatedSubjects,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Subjects updated successfully!');
        onSubjectsUpdate(updatedSubjects);
        
        // Update localStorage if teacher data is stored there
        const storedTeacher = localStorage.getItem('teacher');
        if (storedTeacher) {
          const teacherData = JSON.parse(storedTeacher);
          teacherData.subjects = updatedSubjects;
          localStorage.setItem('teacher', JSON.stringify(teacherData));
        }
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
        // Revert to previous subjects on error
        setSubjects(currentSubjects);
      }
    } catch (error) {
      console.error('Error updating subjects:', error);
      setMessage('Error updating subjects');
      // Revert to previous subjects on error
      setSubjects(currentSubjects);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubject();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Manage Your Subjects</h2>
        <p className="text-gray-600">Add or remove subjects that you teach</p>
      </div>

      {message && (
        <div className={`p-3 rounded ${
          message.includes('Error') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Add New Subject */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Subject</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter subject name (e.g., Mathematics, Physics, etc.)"
            className="input-field flex-1"
            disabled={loading}
          />
          <button
            onClick={addSubject}
            disabled={loading || !newSubject.trim()}
            className="btn-primary whitespace-nowrap"
          >
            Add Subject
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Press Enter or click "Add Subject" to add a new subject to your list
        </p>
      </div>

      {/* Current Subjects */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Subjects ({subjects.length})
        </h3>
        
        {subjects.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p>No subjects added yet. Add your first subject above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{subject}</span>
                <button
                  onClick={() => removeSubject(subject)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove subject"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">How Subject Management Works</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Add subjects that you currently teach or will be teaching</li>
          <li>• These subjects will appear in the dropdown when inputting scores</li>
          <li>• Students you add will be enrolled in these subjects</li>
          <li>• You can remove subjects at any time (this won't affect existing scores)</li>
        </ul>
      </div>
    </div>
  );
}