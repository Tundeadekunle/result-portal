import { Score } from '@/types';

interface ResultTableProps {
  scores: Score[];
}

export default function ResultTable({ scores }: ResultTableProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject-wise Scores</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CA Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scores.map((score) => (
              <tr key={score.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {score.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.caScore}/40
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.examScore}/60
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.totalScore}/100
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    score.grade === 'A' ? 'bg-green-100 text-green-800' :
                    score.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    score.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                    score.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {score.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}