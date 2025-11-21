'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subjects: [''],
    classes: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, ''],
    });
  };

  const removeSubject = (index: number) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((_, i) => i !== index),
    });
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addClass = () => {
    setFormData({
      ...formData,
      classes: [...formData.classes, ''],
    });
  };

  const removeClass = (index: number) => {
    setFormData({
      ...formData,
      classes: formData.classes.filter((_, i) => i !== index),
    });
  };

  const updateClass = (index: number, value: string) => {
    const newClasses = [...formData.classes];
    newClasses[index] = value;
    setFormData({ ...formData, classes: newClasses });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Filter out empty subjects and classes
    const validSubjects = formData.subjects.filter(subject => subject.trim());
    const validClasses = formData.classes.filter(className => className.trim());

    if (validSubjects.length === 0) {
      setError('Please add at least one subject');
      setLoading(false);
      return;
    }

    if (validClasses.length === 0) {
      setError('Please add at least one class');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          subjects: validSubjects,
          classes: validClasses,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful! Please login.');
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto card">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Registration</h1>
        <p className="text-gray-600 mt-2">Create your teacher account and register the subjects you teach</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="input-field"
              required
              minLength={6}
            />
          </div>
        </div>

        {/* Subjects Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subjects You Teach *
            </label>
            <button
              type="button"
              onClick={addSubject}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Add Subject
            </button>
          </div>
          <div className="space-y-2">
            {formData.subjects.map((subject, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => updateSubject(index, e.target.value)}
                  placeholder="e.g., Mathematics, English, Physics, etc."
                  className="input-field flex-1"
                />
                {formData.subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Add all the subjects you will be teaching and grading
          </p>
        </div>

        {/* Classes Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Classes You Teach *
            </label>
            <button
              type="button"
              onClick={addClass}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Add Class
            </button>
          </div>
          <div className="space-y-2">
            {formData.classes.map((className, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => updateClass(index, e.target.value)}
                  placeholder="e.g., Grade 10A, Grade 11B, etc."
                  className="input-field flex-1"
                />
                {formData.classes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClass(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Add all the classes you will be teaching
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Registering...' : 'Register as Teacher'}
        </button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}