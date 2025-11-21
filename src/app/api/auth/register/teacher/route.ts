// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { hashPassword } from '@/lib/auth';

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, password, subjects, classes } = await request.json();

//     // Validate required fields
//     if (!name || !email || !password || !subjects || !classes) {
//       return NextResponse.json(
//         { error: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Check if email already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'Email already registered' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);

//     // Create user and teacher in a transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Create user
//       const user = await tx.user.create({
//         data: {
//           email,
//           password: hashedPassword,
//           role: 'TEACHER',
//         },
//       });

//       // Create teacher
//       const teacher = await tx.teacher.create({
//         data: {
//           userId: user.id,
//           name,
//           email,
//           subjects: subjects.filter((s: string) => s.trim()),
//           classes: classes.filter((c: string) => c.trim()),
//         },
//       });

//       return { user, teacher };
//     });

//     // Remove password from response
//     const { password: _, ...userWithoutPassword } = result.user;

//     return NextResponse.json({
//       message: 'Teacher registered successfully',
//       user: userWithoutPassword,
//       teacher: result.teacher,
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Teacher registration error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

















import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, subjects, classes } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !subjects || !classes) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'TEACHER',
      },
    });

    // Create teacher
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        name,
        email,
        subjects: subjects.filter((s: string) => s.trim()),
        classes: classes.filter((c: string) => c.trim()),
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Teacher registered successfully',
      user: userWithoutPassword,
      teacher,
    }, { status: 201 });
  } catch (error) {
    console.error('Teacher registration error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Registration failed: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}