import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students")
      .then((res) => setStudents(res.data.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch students");
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (!confirm) return;

    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
      alert("Student deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Student List</h2>
      {students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center">
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.roll}</td>
                <td className="border p-2">{student.studentClass}</td>
                <td className="border p-2">{student.section}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => navigate(`/students/edit/${student._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
