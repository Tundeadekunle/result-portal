'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentList from '@/components/teachers/StudentList';

export default function TeachersStudentsPage() {
  const [teacher, setTeacher] = useState<any>(null);
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <p className="text-gray-600">View and manage student information</p>
      </div>

      <div className="card">
        <StudentList />
      </div>
    </div>
  );
}