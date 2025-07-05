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
    const entries = Object.entries(attendanceData);

    try {
      for (const [studentId, status] of entries) {
        await api.post("/attendance", {
          studentId,
          date,
          status
        });
      }
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Error submitting attendance");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block mb-4 p-2 border rounded"
        />
        <table className="w-full border table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.roll}</td>
                <td className="p-2 border">
                  <select
                    value={attendanceData[s._id] || ""}
                    onChange={(e) => handleChange(s._id, e.target.value)}
                    required
                    className="p-1 border rounded"
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
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
