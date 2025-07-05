import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentForm from "./pages/StudentForm";
import StudentList from './pages/StudentList';
import ResultForm from './pages/ResultForm';
import ResultList from './pages/ResultList';
import HomeworkForm from './pages/HomeworkForm';
import HomeworkList from './pages/HomeworkList';
import AttendanceForm from './pages/AttendenceForm';
import AddResult from './pages/AddResult';
import StudentResults from './pages/StudentResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Add Student</Link>
          <Link to="/students" className="text-blue-600 hover:underline">View Students</Link>
          <Link to="/results" className="text-blue-600 hover:underline">View Results</Link>
          <Link to="/results/form" className="text-blue-600 hover:underline">Result Form</Link>
          <Link to="/results/add" className="text-blue-600 hover:underline">Add Result</Link>
          <Link to="/homework" className="text-blue-600 hover:underline">View Homework</Link>
          <Link to="/homework/add" className="text-blue-600 hover:underline">Add Homework</Link>
          <Link to="/attendance" className="text-blue-600 hover:underline">Mark Attendance</Link>
        </nav>

        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/results" element={<ResultList />} />
          <Route path="/results/form" element={<ResultForm />} />
          <Route path="/results/add" element={<AddResult />} />
          <Route path="/results/student/:id" element={<StudentResults />} />
          <Route path="/homework" element={<HomeworkList />} />
          <Route path="/homework/add" element={<HomeworkForm />} />
          <Route path="/attendance" element={<AttendanceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
