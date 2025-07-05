import React, { useEffect, useState } from "react";
import api from "../services/api";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subjects from backend
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects"); // Replace with your actual route
        setSubjects(response.data.data || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Subjects</h2>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject._id} className="p-4 border rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">{subject.name}</h3>
              <a
                href={subject.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Notes
              </a>
            </div>
            <p className="text-gray-600 mt-1">{subject.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${subject.syllabusCompletion}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Syllabus Completion: {subject.syllabusCompletion}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
