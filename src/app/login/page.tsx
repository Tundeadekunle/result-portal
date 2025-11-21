// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'TEACHER' | 'STUDENT'>('TEACHER');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, role }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         if (role === 'TEACHER') {
//           router.push('/teachers/dashboard');
//         } else {
//           router.push('/students/dashboard');
//         }
//       } else {
//         alert('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto card">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Role
//           </label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value as 'TEACHER' | 'STUDENT')}
//             className="input-field"
//           >
//             <option value="TEACHER">Teacher</option>
//             <option value="STUDENT">Student</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input-field"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full btn-primary"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       <div className="mt-6 text-center text-sm text-gray-600">
//         <p>Demo Credentials:</p>
//         <p>Teachers: teacher@school.com / password</p>
//         <p>Students: student@school.com / password</p>
//       </div>
//     </div>
//   );
// }























'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'TEACHER' | 'STUDENT'>('TEACHER');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      // In the handleSubmit function, update the redirect section:
if (response.ok) {
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  if (role === 'TEACHER') {
    localStorage.setItem('teacher', JSON.stringify(data.teacher));
    router.push('/teachers/dashboard');
  } else {
    localStorage.setItem('student', JSON.stringify(data.student));
    router.push('/students/dashboard'); // This was missing
  }
} else {
        const errorData = await response.json();
        alert(errorData.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I am a
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'TEACHER' | 'STUDENT')}
            className="input-field"
          >
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {role === 'TEACHER' ? 'Email' : 'Admission Number'}
          </label>
          <input
            type={role === 'TEACHER' ? 'email' : 'text'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder={role === 'TEACHER' ? 'teacher@school.com' : 'ADM20240001'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {role === 'TEACHER' ? (
          <p>
            Don't have an account?{' '}
            <Link href="/register/teacher" className="text-blue-600 hover:underline">
              Register as Teacher
            </Link>
          </p>
        ) : (
          <p>
            Students: Use your admission number and default password provided by your teacher
          </p>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Demo Credentials:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Teachers:</strong> teacher@school.com / password</p>
          <p><strong>Students:</strong> ADM20240001 / password</p>
        </div>
      </div>
    </div>
  );
}