import { useState } from "react";
import api from "../services/api";

const HomeworkForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    subject: "",
    assignedClass: "",
    section: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/homework", formData);
      alert("Homework added successfully");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        subject: "",
        assignedClass: "",
        section: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error adding homework");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Assign Homework</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Homework Title" value={formData.title} onChange={handleChange} required className="input w-full" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input w-full" />
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="input w-full" />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="input w-full" />
        <input type="text" name="assignedClass" placeholder="Class" value={formData.assignedClass} onChange={handleChange} required className="input w-full" />
        <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} required className="input w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Assign</button>
      </form>
    </div>
  );
};

export default HomeworkForm;
