// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { verifyPassword, generateToken } from '@/lib/auth';

// export async function POST(request: NextRequest) {
//   try {
//     const { email, password, role } = await request.json();

//     // Find user
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: {
//         teacher: true,
//         student: true,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Check role
//     if (user.role !== role) {
//       return NextResponse.json(
//         { error: 'Invalid role for this user' },
//         { status: 401 }
//       );
//     }

//     // Verify password (in production, use hashed passwords)
//     // For demo, we'll use simple password check
//     const isValidPassword = password === 'password'; // Replace with proper hashing

//     if (!isValidPassword) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = generateToken({
//       userId: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     // Return user data without password
//     const { password: _, ...userWithoutPassword } = user;

//     return NextResponse.json({
//       user: userWithoutPassword,
//       teacher: user.teacher,
//       student: user.student,
//       token,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }














import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    let user;

    if (role === 'STUDENT') {
      // For students, find by admission number (which is stored in studentId)
      const student = await prisma.student.findFirst({
        where: { 
          OR: [
            { studentId: email }, // Admission number
            { email: email } // Or email
          ]
        },
        include: {
          user: true,
        },
      });

      user = student?.user;
    } else {
      // For teachers, find by email
      user = await prisma.user.findUnique({
        where: { email },
        include: {
          teacher: role === 'TEACHER',
          student: role === 'STUDENT',
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check role
    if (user.role !== role) {
      return NextResponse.json(
        { error: 'Invalid role for this user' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    const responseData: any = {
      user: userWithoutPassword,
      token,
    };

    // Include teacher or student data
    if (role === 'TEACHER' && user.teacher) {
      responseData.teacher = user.teacher;
    } else if (role === 'STUDENT') {
      const student = await prisma.student.findFirst({
        where: { userId: user.id },
        include: {
          teacher: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      responseData.student = student;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}