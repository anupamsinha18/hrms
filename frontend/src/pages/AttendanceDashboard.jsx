import { useState, useEffect } from 'react';
import api from '../api';
import { FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const AttendanceDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [status, setStatus] = useState('Present');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [recordsLoading, setRecordsLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/employees/');
                setEmployees(res.data);
                if (res.data.length > 0) setSelectedEmployee(res.data[0].employee_id);
            } catch (err) {
                console.error('Failed to fetch employees:', err);
                setMessage('Failed to load employees');
            }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            fetchAttendance();
        }
    }, [selectedEmployee]);

    const fetchAttendance = async () => {
        setRecordsLoading(true);
        try {
            const res = await api.get(`/attendance/${selectedEmployee}`);
            setAttendanceRecords(res.data);
        } catch (err) {
            console.error('Failed to fetch attendance:', err);
        } finally {
            setRecordsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await api.post('/attendance/', {
                employee_id: selectedEmployee,
                date,
                status
            });
            setMessage('Attendance marked successfully!');
            fetchAttendance();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(err.response?.data?.detail || 'Failed to mark attendance');
        } finally {
            setLoading(false);
        }
    };

    const getPresentDays = () => {
        return attendanceRecords.filter(r => r.status === 'Present').length;
    };

    return (
        <div className="container mx-auto px-4 max-w-7xl animate-fade-in">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand-text flex items-center gap-3 tracking-tight">
                    <FaCalendarCheck className="text-brand-accent" />
                    Attendance Management
                </h1>
                <p className="text-brand-muted mt-2 font-light">Track and manage employee attendance records.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg shadow-sm animate-fade-in border-l-4 ${message.includes('Failed') ? 'bg-red-900/20 border-red-500' : 'bg-green-900/20 border-green-500'}`}>
                    <div className="flex items-center gap-2">
                        {message.includes('Failed') ? <FaExclamationCircle className="text-red-400" /> : <FaCheckCircle className="text-green-400" />}
                        <p className={`font-medium ${message.includes('Failed') ? 'text-red-200' : 'text-green-300'}`}>
                            {message}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Mark Attendance Card */}
                <div className="lg:col-span-1">
                    <div className="bg-brand-card p-6 rounded-2xl shadow-xl border border-brand-highlight sticky top-6">
                        <h2 className="text-xl font-semibold mb-6 text-brand-text flex items-center gap-2">
                            <FaCheckCircle className="text-brand-accent" />
                            Mark Attendance
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-2">Employee</label>
                                <select
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none"
                                >
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp.employee_id}>
                                            {emp.full_name} ({emp.employee_id})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-2">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-2">Status</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStatus('Present')}
                                        className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 font-medium ${status === 'Present'
                                            ? 'bg-green-600/20 text-green-400 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                                            : 'bg-brand-dark text-brand-muted border-brand-highlight hover:border-green-500/50 hover:text-green-400'
                                            }`}
                                    >
                                        <FaCheckCircle />
                                        Present
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('Absent')}
                                        className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 font-medium ${status === 'Absent'
                                            ? 'bg-red-600/20 text-red-400 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                                            : 'bg-brand-dark text-brand-muted border-brand-highlight hover:border-red-500/50 hover:text-red-400'
                                            }`}
                                    >
                                        <FaTimesCircle />
                                        Absent
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-accent text-brand-dark p-3 rounded-lg hover:bg-sky-300 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? 'Marking...' : 'Mark Attendance'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Attendance History */}
                <div className="lg:col-span-2">
                    <div className="bg-brand-card p-6 rounded-2xl shadow-xl border border-brand-highlight min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-brand-text">Attendance History</h2>
                            {attendanceRecords.length > 0 && (
                                <div className="bg-brand-highlight/30 text-brand-accent px-4 py-2 rounded-lg font-mono text-sm border border-brand-highlight">
                                    Present: <span className="font-bold">{getPresentDays()}</span> days
                                </div>
                            )}
                        </div>

                        {recordsLoading ? (
                            <div className="space-y-4 animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-brand-highlight/30 rounded-lg w-full"></div>
                                ))}
                            </div>
                        ) : attendanceRecords.length === 0 ? (
                            <div className="text-center py-12">
                                <FaCalendarCheck className="mx-auto text-6xl text-brand-muted/30 mb-4" />
                                <p className="text-brand-muted text-lg">No attendance records found</p>
                                <p className="text-brand-muted/50 text-sm mt-2">Select an employee and mark attendance to see records here.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-brand-highlight">
                                <table className="min-w-full divide-y divide-brand-highlight">
                                    <thead className="bg-brand-dark">
                                        <tr>
                                            <th className="p-4 text-left font-semibold text-brand-muted uppercase text-xs tracking-wider">Date</th>
                                            <th className="p-4 text-left font-semibold text-brand-muted uppercase text-xs tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-highlight/50 bg-brand-card/50">
                                        {attendanceRecords.map((record) => (
                                            <tr key={record._id} className="hover:bg-brand-highlight/20 transition-colors duration-150">
                                                <td className="p-4 text-brand-text font-mono text-sm">
                                                    {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit border ${record.status === 'Present'
                                                        ? 'bg-green-900/30 text-green-400 border-green-500/30'
                                                        : 'bg-red-900/30 text-red-400 border-red-500/30'
                                                        }`}>
                                                        {record.status === 'Present' ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard;
