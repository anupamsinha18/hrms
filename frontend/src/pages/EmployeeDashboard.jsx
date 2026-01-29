import { useState, useEffect } from 'react';
import api from '../api';

import { FaPlus, FaUserTie, FaExclamationCircle } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

const EmployeeDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: 'Engineering'
    });
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); // For initial skeleton load
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [deleteId, setDeleteId] = useState(null);



    const fetchEmployees = async () => {
        // Only set loading spinner if it's not the initial page load (which uses skeletons)
        if (!pageLoading) setLoading(true);
        setError('');
        try {
            const response = await api.get('/employees/');
            console.log('Fetched employees:', response.data);
            setEmployees(response.data);
        } catch (err) {
            const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch employees';
            setError(errorMsg);
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
            setPageLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            console.log('Submitting employee:', newEmployee);
            const response = await api.post('/employees/', newEmployee);
            console.log('Employee added:', response.data);
            setNewEmployee({ employee_id: '', full_name: '', email: '', department: 'Engineering' });
            setSuccess('Employee added successfully!');
            setTimeout(() => setSuccess(''), 3000);
            fetchEmployees();
        } catch (err) {
            const errorMsg = err.response?.data?.detail || err.message || 'Failed to add employee';
            setError(errorMsg);
            console.error('Submit error:', err);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/employees/${deleteId}`);
            setSuccess('Employee deleted successfully!');
            setTimeout(() => setSuccess(''), 3000);
            fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to delete employee');
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-7xl animate-fade-in relative">
            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-brand-card border border-brand-highlight p-6 rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="text-center">
                            <div className="bg-red-500/10 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiTrash2 className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-text mb-2">Delete Employee?</h3>
                            <p className="text-brand-muted mb-6">
                                Are you sure you want to delete this employee? This action cannot be undone.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={cancelDelete}
                                    className="px-6 py-2 rounded-lg bg-brand-highlight text-brand-text hover:bg-brand-highlight/80 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={executeDelete}
                                    className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand-text flex items-center gap-3 tracking-tight">
                    <FaUserTie className="text-brand-accent" />
                    Employee Management
                </h1>
                <p className="text-brand-muted mt-2 font-light">Manage your organization's workforce with ease.</p>
            </div>

            {/* Status Messages */}
            {error && (
                <div className="mb-6 bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-pulse">
                    <div className="flex items-center gap-2">
                        <FaExclamationCircle className="text-red-400" />
                        <p className="text-red-200 font-medium">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm animate-fade-in">
                    <p className="text-green-300 font-medium">✓ {success}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Employee Form */}
                <div className="lg:col-span-1">
                    <div className="bg-brand-card p-6 rounded-2xl shadow-xl border border-brand-highlight sticky top-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-brand-text">
                            <FaPlus className="text-brand-accent" /> Add New Employee
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-1">Employee ID *</label>
                                <input
                                    type="text"
                                    name="employee_id"
                                    placeholder="e.g., EMP001"
                                    value={newEmployee.employee_id}
                                    onChange={handleChange}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none placeholder-brand-muted/50"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="John Doe"
                                    value={newEmployee.full_name}
                                    onChange={handleChange}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none placeholder-brand-muted/50"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@company.com"
                                    value={newEmployee.email}
                                    onChange={handleChange}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none placeholder-brand-muted/50"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-1">Department *</label>
                                <select
                                    name="department"
                                    value={newEmployee.department}
                                    onChange={handleChange}
                                    className="w-full bg-brand-dark border border-brand-highlight text-brand-text p-3 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all outline-none"
                                >
                                    <option value="Engineering">Engineering</option>
                                    <option value="HR">HR</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-accent text-brand-dark p-3 rounded-lg hover:bg-sky-300 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-dark"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaPlus /> Add Employee
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Employee List */}
                <div className="lg:col-span-2">
                    <div className="bg-brand-card p-6 rounded-2xl shadow-xl border border-brand-highlight min-h-[500px]">
                        <h2 className="text-xl font-semibold mb-6 text-brand-text">Employee Directory</h2>

                        {pageLoading ? (
                            // Skeleton Loader
                            <div className="space-y-4 animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-brand-highlight/30 rounded-lg w-full"></div>
                                ))}
                            </div>
                        ) : employees.length === 0 ? (
                            <div className="text-center py-20">
                                <FaUserTie className="mx-auto text-6xl text-brand-muted/30 mb-4" />
                                <p className="text-brand-muted text-lg">No employees found.</p>
                                <p className="text-brand-muted/50 text-sm mt-2">Add your first employee using the form on the left.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-brand-highlight">
                                <table className="min-w-full divide-y divide-brand-highlight">
                                    <thead className="bg-brand-dark">
                                        <tr>
                                            <th className="p-4 text-left font-semibold text-brand-muted uppercase text-xs tracking-wider">ID</th>
                                            <th className="p-4 text-left font-semibold text-brand-muted uppercase text-xs tracking-wider">Name</th>
                                            <th className="p-4 text-left font-semibold text-brand-muted uppercase text-xs tracking-wider">Dept</th>
                                            <th className="p-4 text-right font-semibold text-brand-muted uppercase text-xs tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-highlight/50 bg-brand-card/50">
                                        {employees.map((emp) => (
                                            <tr key={emp._id} className="hover:bg-brand-highlight/20 transition-colors duration-150 group">
                                                <td className="p-4 font-mono text-sm text-brand-accent">{emp.employee_id}</td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-brand-text">{emp.full_name}</span>
                                                        <span className="text-xs text-brand-muted">{emp.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-brand-highlight/50 text-brand-text/80 rounded text-xs font-medium border border-brand-highlight">
                                                        {emp.department}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => confirmDelete(emp.employee_id)}
                                                        className="text-brand-muted hover:text-red-400 p-2 rounded-lg transition-all duration-200"
                                                        title="Delete Employee"
                                                    >
                                                        <FiTrash2 className="text-lg" />
                                                    </button>
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

export default EmployeeDashboard;
