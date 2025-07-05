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
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Marks</th>
            <th className="border px-4 py-2">Total Marks</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result._id}>
              <td className="border px-4 py-2">{result.student?.name} (Roll: {result.student?.roll})</td>
              <td className="border px-4 py-2">{result.subject}</td>
              <td className="border px-4 py-2">{result.marks}</td>
              <td className="border px-4 py-2">{result.totalMarks}</td>
              <td className="border px-4 py-2">{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultList;
