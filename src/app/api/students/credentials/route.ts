import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');

  if (!teacherId) {
    return NextResponse.json(
      { error: 'Teacher ID is required' },
      { status: 400 }
    );
  }

  try {
    const students = await prisma.student.findMany({
      where: { teacherId },
      select: {
        studentId: true,
        name: true,
        class: true,
        subjects: true,
        admissionDate: true,
      },
      orderBy: { class: 'asc', name: 'asc' },
    });

    // Generate CSV content
    const headers = ['Admission Number', 'Name', 'Class', 'Subjects', 'Admission Date', 'Username', 'Password'];
    const csvRows = students.map(student => [
      student.studentId,
      student.name,
      student.class,
      student.subjects.join(', '),
      new Date(student.admissionDate).toLocaleDateString(),
      student.studentId, // Username is admission number
      'password', // Default password
    ]);

    const csvContent = [
      headers,
      ...csvRows
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    // Return CSV file
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="student-credentials-${teacherId}-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error generating credentials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}