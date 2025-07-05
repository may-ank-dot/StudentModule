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
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">All Homework</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Section</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Due Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {homeworks.map(hw => (
              <tr key={hw._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{hw.title}</td>
                <td className="px-4 py-2 border">{hw.assignedClass}</td>
                <td className="px-4 py-2 border">{hw.section}</td>
                <td className="px-4 py-2 border">{hw.subject}</td>
                <td className="px-4 py-2 border">{new Date(hw.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeworkList;
