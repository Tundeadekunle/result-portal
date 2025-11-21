export interface User {
  id: string;
  email: string;
  role: 'TEACHER' | 'STUDENT' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  userId: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  name: string;
  email: string;
  class: string;
  subjects: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  scores?: Score[];
}

export interface Score {
  id: string;
  studentId: string;
  subject: string;
  caScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
  teacherId: string;
  term: string;
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
  student?: Student;
  teacher?: Teacher;
}

export interface AcademicYear {
  id: string;
  year: string;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Term {
  id: string;
  name: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  student: Student;
  scores: Score[];
  overallAverage: number;
  term: string;
  academicYear: string;
  position?: number;
  classAverage?: number;
}

export interface ScoreInput {
  studentId: string;
  subject: string;
  caScore: number;
  examScore: number;
  teacherId: string;
  term: string;
  academicYear: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  teacher?: Teacher;
  student?: Student;
  token: string;
}


export interface TeacherRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  subjects: string[];
  classes: string[];
}

export interface StudentCreation {
  name: string;
  class: string;
  subjects: string[];
}

export interface AdmissionCounter {
  id: string;
  prefix: string;
  counter: number;
  createdAt: Date;
  updatedAt: Date;
}