import { Result } from '@/types';

interface ResultCardProps {
  result: Result;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { student, overallAverage, term, academicYear, position } = result;

  const getRemarks = (average: number) => {
    if (average >= 90) return 'Excellent';
    if (average >= 80) return 'Very Good';
    if (average >= 70) return 'Good';
    if (average >= 60) return 'Fair';
    if (average >= 50) return 'Average';
    if (average >= 40) return 'Needs Improvement';
    return 'Needs Improvement';
  };

  return (
    <div className="card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{overallAverage.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Overall Average</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{getRemarks(overallAverage)}</div>
          <div className="text-sm text-gray-600">Remarks</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{position || 'N/A'}</div>
          <div className="text-sm text-gray-600">Class Position</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {result.scores.filter(score => score.grade === 'A' || score.grade === 'B').length}
          </div>
          <div className="text-sm text-gray-600">A's & B's</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Student:</strong> {student.name}
        </div>
        <div>
          <strong>Student ID:</strong> {student.studentId}
        </div>
        <div>
          <strong>Class:</strong> {student.class}
        </div>
        <div>
          <strong>Term:</strong> {term} {academicYear}
        </div>
      </div>
    </div>
  );
}