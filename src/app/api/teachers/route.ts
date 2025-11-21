import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      // Get specific teacher by user ID
      const teacher = await prisma.teacher.findFirst({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              createdAt: true,
            },
          },
        },
      });

      if (!teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(teacher);
    } else {
      // Get all teachers
      const teachers = await prisma.teacher.findMany({
        include: {
          user: {
            select: {
              email: true,
              role: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      });

      return NextResponse.json(teachers);
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}