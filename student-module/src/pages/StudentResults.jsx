import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const StudentResults = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/results/${id}`);
        setResults(res.data.data);
        if (res.data.data.length > 0) {
          setStudentName(res.data.data[0].student.name);
        }
      } catch (error) {
        console.error("Failed to fetch results", error);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {studentName ? `${studentName}'s Results` : "Student Results"}
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No results found for this student.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Marks</th>
              <th className="p-2 border">Exam Type</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className="text-center">
                <td className="p-2 border">{result.subject}</td>
                <td className="p-2 border">{result.marks}</td>
                <td className="p-2 border">{result.examType}</td>
                <td className="p-2 border">{new Date(result.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResults;
