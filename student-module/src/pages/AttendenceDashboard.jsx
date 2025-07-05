import React, { useEffect, useState } from "react";
import api from "../services/api";

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance");
        setAttendance(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Attendance Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left border border-gray-300">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Roll No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {attendance.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border">{entry.date}</td>
                <td className="p-3 border">{entry.roll}</td>
                <td className="p-3 border">{entry.name}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      entry.status === "Present" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
