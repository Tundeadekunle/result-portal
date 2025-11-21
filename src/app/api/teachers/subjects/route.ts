import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const { teacherId, subjects } = await request.json();

    if (!teacherId || !subjects || !Array.isArray(subjects)) {
      return NextResponse.json(
        { error: 'Teacher ID and subjects array are required' },
        { status: 400 }
      );
    }

    // Verify teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Filter out empty subjects and remove duplicates
    const validSubjects = subjects
      .filter((subject: string) => subject.trim())
      .filter((subject: string, index: number, array: string[]) => 
        array.indexOf(subject) === index
      );

    if (validSubjects.length === 0) {
      return NextResponse.json(
        { error: 'At least one valid subject is required' },
        { status: 400 }
      );
    }

    // Update teacher subjects
    const updatedTeacher = await prisma.teacher.update({
      where: { id: teacherId },
      data: {
        subjects: validSubjects,
      },
    });

    return NextResponse.json({
      message: 'Subjects updated successfully',
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error('Error updating teacher subjects:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}