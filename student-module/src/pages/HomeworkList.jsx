import { useEffect, useState } from "react";
import api from "../services/api";

const HomeworkList = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await api.get("/homework");
        setHomeworks(res.data.data);
      } catch (err) {
        console.error("Error fetching homework", err);
      }
    };
    fetchHomework();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Homework</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Class</th>
            <th className="border px-4 py-2">Section</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {homeworks.map(hw => (
            <tr key={hw._id}>
              <td className="border px-4 py-2">{hw.title}</td>
              <td className="border px-4 py-2">{hw.assignedClass}</td>
              <td className="border px-4 py-2">{hw.section}</td>
              <td className="border px-4 py-2">{hw.subject}</td>
              <td className="border px-4 py-2">{new Date(hw.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeworkList;
