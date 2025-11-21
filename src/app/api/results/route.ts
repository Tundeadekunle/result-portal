// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { Score } from '@/types';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const studentId = searchParams.get('studentId');

//   if (!studentId) {
//     return NextResponse.json(
//       { error: 'Student ID is required' },
//       { status: 400 }
//     );
//   }

//   try {
//     // Get student data
//     const student = await prisma.student.findUnique({
//       where: { id: studentId },
//     });

//     if (!student) {
//       return NextResponse.json(
//         { error: 'Student not found' },
//         { status: 404 }
//       );
//     }

//     // Get latest scores for the student
//     const scores = await prisma.score.findMany({
//       where: { studentId },
//       include: {
//         teacher: true,
//       },
//       orderBy: { subject: 'asc' },
//     });

//     if (scores.length === 0) {
//       return NextResponse.json(
//         { error: 'No results found for this student' },
//         { status: 404 }
//       );
//     }

//     // Calculate overall average
//     const overallAverage = scores.reduce((sum: number, score: Score) => sum + score.totalScore, 0) / scores.length;

//     // Get term and academic year from the first score (assuming all are from same term)
//     const term = scores[0]?.term || 'N/A';
//     const academicYear = scores[0]?.academicYear || 'N/A';

//     // In a real application, you would calculate position based on class performance
//     const position = Math.floor(Math.random() * 30) + 1; // Mock position

//     const result = {
//       student,
//       scores,
//       overallAverage: Math.round(overallAverage * 100) / 100,
//       term,
//       academicYear,
//       position,
//     };

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


















import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const academicYear = searchParams.get('academicYear') || '2025/2026';
  const term = searchParams.get('term') || 'First Term';

  if (!studentId) {
    return NextResponse.json(
      { error: 'Student ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get student data by studentId (admission number) or internal ID
    const student = await prisma.student.findFirst({
      where: { 
        OR: [
          { id: studentId },
          { studentId: studentId }
        ]
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Get scores for the student with filters
    const scores = await prisma.score.findMany({
      where: { 
        studentId: student.id,
        academicYear,
        term,
      },
      include: {
        teacher: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { subject: 'asc' },
    });

    if (scores.length === 0) {
      return NextResponse.json(
        { error: 'No results found for this student and selected period' },
        { status: 404 }
      );
    }

    // Calculate overall average
    const overallAverage = scores.reduce((sum, score) => sum + score.totalScore, 0) / scores.length;

    // Calculate position based on class performance
    const studentClass = student.class;
    const positionQuery = await prisma.$queryRaw<{ studentId: string; average: number }[]>`
      SELECT "studentId", AVG("totalScore")::float as average
      FROM "scores"
      WHERE "term" = ${term} AND "academicYear" = ${academicYear}
      AND "studentId" IN (SELECT id FROM "students" WHERE class = ${studentClass})
      GROUP BY "studentId"
      ORDER BY average DESC
    `;

    const position = positionQuery.findIndex(row => row.studentId === student.id) + 1;

    const result = {
      student,
      scores,
      overallAverage: Math.round(overallAverage * 100) / 100,
      term,
      academicYear,
      position,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}