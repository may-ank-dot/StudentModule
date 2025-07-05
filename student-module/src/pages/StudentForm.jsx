import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const StudentForm = () => {
  const { id } = useParams(); // <-- detect edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    studentClass: "",
    section: "",
    gender: "",
    dob: "",
    parentType: "",
    parentName: "",
    parentNumber: "",
    parentEmail: "",
    currentAddress: "",
    permanentAddress: "",
  });

  // Fetch student data if editing
  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`)
        .then(res => setFormData(res.data.data))
        .catch(err => {
          console.error(err);
          alert("Failed to load student data");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await api.put(`/students/${id}`, formData);
        alert("Student updated successfully");
      } else {
        await api.post("/students", formData);
        alert("Student added successfully");
      }
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Error submitting student info");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Student" : "Student Information"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} required className="input" />
          <input type="number" name="roll" placeholder="Roll Number" value={formData.roll} onChange={handleChange} required className="input" />
          <input type="text" name="studentClass" placeholder="Class" value={formData.studentClass} onChange={handleChange} required className="input" />
          <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} required className="input" />
          <select name="gender" value={formData.gender} onChange={handleChange} required className="input">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input" />
        </div>

        <h3 className="text-lg font-medium mt-4">Parent Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <select name="parentType" value={formData.parentType} onChange={handleChange} required className="input">
            <option value="">Select Parent Type</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Local Guardian">Local Guardian</option>
          </select>
          <input type="text" name="parentName" placeholder="Parent/Guardian Name" value={formData.parentName} onChange={handleChange} required className="input" />
          <input type="text" name="parentNumber" placeholder="Parent Contact" value={formData.parentNumber} onChange={handleChange} required className="input" />
          <input type="email" name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleChange} required className="input" />
        </div>

        <h3 className="text-lg font-medium mt-4">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} className="input" />
          <input type="text" name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} className="input" />
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
