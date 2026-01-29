import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AttendanceDashboard from './pages/AttendanceDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-dark text-brand-text font-sans">
        <Navbar />
        <div className="py-6 animate-fade-in">
          <Routes>
            <Route path="/" element={<EmployeeDashboard />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
