import { useEffect, useState } from "react";
import api from "../services/api";

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    api.get("/students")
      .then((res) => setStudents(res.data.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load students");
      });
  }, []);

  const handleChange = (studentId, status) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entries = Object.entries(attendanceData);
      for (const [studentId, status] of entries) {
        await api.post("/attendance", { studentId, date, status });
      }
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Error submitting attendance");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 text-center">
          <label className="font-medium mr-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Student Name</th>
                <th className="p-3 border">Roll No</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.roll}</td>
                  <td className="p-3 border">
                    <select
                      value={attendanceData[s._id] || ""}
                      onChange={(e) => handleChange(s._id, e.target.value)}
                      required
                      className="px-3 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Attendance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
