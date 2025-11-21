import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateGrade } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { studentId, subject, caScore, examScore, teacherId, term, academicYear } = body;
    
    if (!studentId || !subject || caScore === undefined || examScore === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate score ranges
    if (caScore < 0 || caScore > 40) {
      return NextResponse.json(
        { error: 'CA score must be between 0 and 40' },
        { status: 400 }
      );
    }

    if (examScore < 0 || examScore > 60) {
      return NextResponse.json(
        { error: 'Exam score must be between 0 and 60' },
        { status: 400 }
      );
    }

    const totalScore = caScore + examScore;
    const grade = calculateGrade(totalScore);

    // Check if score already exists for this student, subject, term, and academic year
    const existingScore = await prisma.score.findFirst({
      where: {
        studentId,
        subject,
        term,
        academicYear,
      },
    });

    let score;
    if (existingScore) {
      // Update existing score
      score = await prisma.score.update({
        where: { id: existingScore.id },
        data: {
          caScore,
          examScore,
          totalScore,
          grade,
        },
        include: {
          student: true,
          teacher: true,
        },
      });
    } else {
      // Create new score
      score = await prisma.score.create({
        data: {
          studentId,
          subject,
          caScore,
          examScore,
          totalScore,
          grade,
          teacherId,
          term,
          academicYear,
        },
        include: {
          student: true,
          teacher: true,
        },
      });
    }

    return NextResponse.json(score, { status: 201 });
  } catch (error) {
    console.error('Error creating score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const teacherId = searchParams.get('teacherId');
  
  try {
    let scores;
    
    if (studentId) {
      scores = await prisma.score.findMany({
        where: { studentId },
        include: {
          student: true,
          teacher: true,
        },
        orderBy: { subject: 'asc' },
      });
    } else if (teacherId) {
      scores = await prisma.score.findMany({
        where: { teacherId },
        include: {
          student: true,
          teacher: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      scores = await prisma.score.findMany({
        include: {
          student: true,
          teacher: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }
    
    return NextResponse.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}