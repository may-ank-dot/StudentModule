import { useEffect, useState } from "react";
import api from "../services/api";

const ResultList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/results");
        setResults(res.data.data);
      } catch (err) {
        console.error("Error fetching results", err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2 border">Student</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Marks</th>
              <th className="px-4 py-2 border">Total Marks</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {results.map(result => (
              <tr key={result._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {result.student?.name} (Roll: {result.student?.roll})
                </td>
                <td className="px-4 py-2 border">{result.subject}</td>
                <td className="px-4 py-2 border">{result.marks}</td>
                <td className="px-4 py-2 border">{result.totalMarks}</td>
                <td className="px-4 py-2 border">
                  {new Date(result.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultList;
