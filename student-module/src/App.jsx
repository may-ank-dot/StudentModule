import { useState } from 'react'
import './App.css'
import StudentForm from "./pages/StudentForm";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <StudentForm />
      </div>
    </>
  )
}

export default App
