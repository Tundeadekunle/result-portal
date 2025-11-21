// // import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/db';

// // export async function GET(request: NextRequest) {
// //   const { searchParams } = new URL(request.url);
// //   const userId = searchParams.get('userId');

// //   try {
// //     let students;
    
// //     if (userId) {
// //       // Get specific student by user ID
// //       const student = await prisma.student.findFirst({
// //         where: { userId },
// //         include: {
// //           user: {
// //             select: {
// //               id: true,
// //               email: true,
// //               role: true,
// //               createdAt: true,
// //             },
// //           },
// //         },
// //       });

// //       if (!student) {
// //         return NextResponse.json(
// //           { error: 'Student not found' },
// //           { status: 404 }
// //         );
// //       }

// //       return NextResponse.json(student);
// //     } else {
// //       // Get all students
// //       students = await prisma.student.findMany({
// //         include: {
// //           user: {
// //             select: {
// //               email: true,
// //               role: true,
// //             },
// //           },
// //         },
// //         orderBy: { name: 'asc' },
// //       });

// //       return NextResponse.json(students);
// //     }
// //   } catch (error) {
// //     console.error('Error fetching students:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

















// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { hashPassword } from '@/lib/auth';

// export async function POST(request: NextRequest) {
//   try {
//     const { name, class: className, subjects, teacherId } = await request.json();

//     if (!name || !className || !subjects || !teacherId) {
//       return NextResponse.json(
//         { error: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Verify teacher exists
//     const teacher = await prisma.teacher.findUnique({
//       where: { id: teacherId },
//     });

//     if (!teacher) {
//       return NextResponse.json(
//         { error: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     // Generate admission number
//     const currentYear = new Date().getFullYear();
//     const prefix = `ADM${currentYear}`;

//     // Get or create admission counter
//     let admissionCounter = await prisma.admissionCounter.findUnique({
//       where: { prefix },
//     });

//     if (!admissionCounter) {
//       admissionCounter = await prisma.admissionCounter.create({
//         data: { prefix, counter: 1 },
//       });
//     }

//     const admissionNumber = `${prefix}${admissionCounter.counter.toString().padStart(4, '0')}`;

//     // Increment counter for next student
//     await prisma.admissionCounter.update({
//       where: { id: admissionCounter.id },
//       data: { counter: admissionCounter.counter + 1 },
//     });

//     // Create student in transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Create user for student
//       const user = await tx.user.create({
//         data: {
//           email: `${admissionNumber}@school.com`, // Use admission number as email base
//           password: await hashPassword('password'), // Default password
//           role: 'STUDENT',
//         },
//       });

//       // Create student
//       const student = await tx.student.create({
//         data: {
//           userId: user.id,
//           studentId: admissionNumber,
//           name,
//           email: `${admissionNumber}@school.com`,
//           class: className,
//           subjects: subjects.filter((s: string) => s.trim()),
//           teacherId,
//         },
//         include: {
//           user: {
//             select: {
//               id: true,
//               email: true,
//               role: true,
//             },
//           },
//         },
//       });

//       return student;
//     });

//     return NextResponse.json({
//       message: 'Student created successfully',
//       student: result,
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating student:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const teacherId = searchParams.get('teacherId');
//   const userId = searchParams.get('userId');

//   try {
//     if (teacherId) {
//       // Get students for a specific teacher
//       const students = await prisma.student.findMany({
//         where: { teacherId },
//         include: {
//           user: {
//             select: {
//               email: true,
//               role: true,
//             },
//           },
//         },
//         orderBy: { createdAt: 'desc' },
//       });

//       return NextResponse.json(students);
//     } else if (userId) {
//       // Get specific student by user ID
//       const student = await prisma.student.findFirst({
//         where: { userId },
//         include: {
//           user: {
//             select: {
//               id: true,
//               email: true,
//               role: true,
//               createdAt: true,
//             },
//           },
//           teacher: {
//             select: {
//               id: true,
//               name: true,
//               email: true,
//             },
//           },
//         },
//       });

//       if (!student) {
//         return NextResponse.json(
//           { error: 'Student not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(student);
//     } else {
//       // Get all students (for admin purposes)
//       const students = await prisma.student.findMany({
//         include: {
//           user: {
//             select: {
//               email: true,
//               role: true,
//             },
//           },
//           teacher: {
//             select: {
//               name: true,
//               email: true,
//             },
//           },
//         },
//         orderBy: { name: 'asc' },
//       });

//       return NextResponse.json(students);
//     }
//   } catch (error) {
//     console.error('Error fetching students:', error);
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
    const { name, class: className, subjects, teacherId } = await request.json();

    if (!name || !className || !subjects || !teacherId) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Generate admission number
    const currentYear = new Date().getFullYear();
    const prefix = `ADM${currentYear}`;

    // Get or create admission counter
    let admissionCounter = await prisma.admissionCounter.findUnique({
      where: { prefix },
    });

    if (!admissionCounter) {
      admissionCounter = await prisma.admissionCounter.create({
        data: { prefix, counter: 1 },
      });
    }

    const admissionNumber = `${prefix}${admissionCounter.counter.toString().padStart(4, '0')}`;

    // Create user for student
    const user = await prisma.user.create({
      data: {
        email: `${admissionNumber}@school.com`,
        password: await hashPassword('password'),
        role: 'STUDENT',
      },
    });

    // Create student
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        studentId: admissionNumber,
        name,
        email: `${admissionNumber}@school.com`,
        class: className,
        subjects: subjects.filter((s: string) => s.trim()),
        teacherId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Increment counter for next student
    await prisma.admissionCounter.update({
      where: { id: admissionCounter.id },
      data: { counter: admissionCounter.counter + 1 },
    });

    return NextResponse.json({
      message: 'Student created successfully',
      student,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    
    // More specific error handling
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');
  const userId = searchParams.get('userId');

  try {
    if (teacherId) {
      // Get students for a specific teacher
      const students = await prisma.student.findMany({
        where: { teacherId },
        include: {
          user: {
            select: {
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(students);
    } else if (userId) {
      // Get specific student by user ID
      const student = await prisma.student.findFirst({
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
          teacher: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(student);
    } else {
      // Get all students
      const students = await prisma.student.findMany({
        include: {
          user: {
            select: {
              email: true,
              role: true,
            },
          },
          teacher: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      });

      return NextResponse.json(students);
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}