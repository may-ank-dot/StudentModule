import { useEffect, useState } from "react";
import api from "../services/api";

const ResultForm = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    marks: "",
    totalMarks: ""
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data.data);
      } catch (err) {
        console.error("Error fetching students", err);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results", formData);
      alert("Result added successfully");
      setFormData({
        studentId: "",
        subject: "",
        marks: "",
        totalMarks: ""
      });
    } catch (err) {
      alert("Error adding result");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Result</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>
              {s.name} (Roll: {s.roll})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks Obtained"
          value={formData.marks}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
