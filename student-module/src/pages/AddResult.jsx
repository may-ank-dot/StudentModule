import { useEffect, useState } from "react";
import api from "../services/api";

const AddResult = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    subject: "",
    marks: "",
    examType: "Midterm"
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/students");
      setStudents(res.data.data);
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results", form);
      alert("Result Added");
    } catch (err) {
      alert("Error adding result");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Student Result</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="student" value={form.student} onChange={handleChange} required className="input w-full">
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>{s.name} (Roll {s.roll})</option>
          ))}
        </select>

        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="input w-full" required />
        <input type="number" name="marks" placeholder="Marks" value={form.marks} onChange={handleChange} className="input w-full" required />

        <select name="examType" value={form.examType} onChange={handleChange} className="input w-full">
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
          <option value="Unit Test">Unit Test</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Result</button>
      </form>
    </div>
  );
};

export default AddResult;
