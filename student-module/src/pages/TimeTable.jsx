import React, { useEffect, useState } from "react";
import api from "../services/api";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await api.get("/timetable"); // Adjust endpoint if needed
        setTimetable(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch timetable:", err);
      }
    };
    fetchTimetable();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Class Timetable</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Day</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.day}</td>
                <td className="border p-2">{item.time}</td>
                <td className="border p-2">{item.subject}</td>
                <td className="border p-2">{item.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
