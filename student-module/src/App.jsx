import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentForm from "./pages/StudentForm";
import StudentList from './pages/StudentList';
import ResultForm from './pages/ResultForm';
import ResultList from './pages/ResultList';
import HomeworkForm from './pages/HomeworkForm';
import HomeworkList from './pages/HomeworkList';
import AttendanceForm from './pages/AttendenceForm';
import StudentResults from './pages/StudentResults';
import SubjectList from './pages/SubjectList';
import Timetable from './pages/TimeTable';
import AttendanceDashboard from './pages/AttendenceDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <nav className="bg-white shadow rounded-lg px-6 py-4 mb-6 flex flex-wrap gap-4 justify-center">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Add Student</Link>
          <Link to="/students" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">View Students</Link>
          <Link to="/results" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">View Results</Link>
          <Link to="/results/form" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Result Form</Link>
          <Link to="/homework" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">View Homework</Link>
          <Link to="/homework/add" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Add Homework</Link>
          <Link to="/attendance" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Mark Attendance</Link>
          <Link to="/subjects" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Subjects</Link>
          <Link to="/timetable" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Timetable</Link>
          <Link to="/attendance/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Attendance Dashboard</Link>
        </nav>

        <div className="bg-white shadow rounded-lg p-6 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<StudentForm />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/results" element={<ResultList />} />
            <Route path="/results/form" element={<ResultForm />} />
            <Route path="/results/student/:id" element={<StudentResults />} />
            <Route path="/homework" element={<HomeworkList />} />
            <Route path="/homework/add" element={<HomeworkForm />} />
            <Route path="/attendance" element={<AttendanceForm />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance/dashboard" element={<AttendanceDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
