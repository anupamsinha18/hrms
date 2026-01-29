import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarCheck, FaBriefcase, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;
    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { path: '/', label: 'Employees', icon: FaUsers },
        { path: '/attendance', label: 'Attendance', icon: FaCalendarCheck },
    ];

    return (
        <nav className="bg-brand-card border-b border-brand-highlight text-brand-text shadow-lg relative z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaBriefcase className="text-3xl text-brand-accent" />
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">HRMS Lite</h1>
                            <p className="text-xs text-brand-muted">Human Resource Management</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium border ${isActive(link.path)
                                    ? 'bg-brand-accent text-brand-dark border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                    : 'border-transparent text-brand-muted hover:text-brand-text hover:bg-brand-highlight'
                                    }`}
                            >
                                <link.icon />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-brand-text text-2xl p-2 rounded-lg hover:bg-brand-highlight focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in border-t border-brand-highlight pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 font-medium border ${isActive(link.path)
                                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/50'
                                    : 'border-transparent text-brand-muted hover:text-brand-text hover:bg-brand-highlight'
                                    }`}
                            >
                                <link.icon />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
