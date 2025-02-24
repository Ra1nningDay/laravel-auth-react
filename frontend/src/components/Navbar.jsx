import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // ตรวจสอบ token ใน localStorage (หรือที่ที่คุณเก็บ token)
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // ลบ token ออกจาก localStorage และเปลี่ยนเส้นทางไปหน้า login
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="bg-white dark:bg-gray-800 sticky w-full z-50">
            <div className="flex justify-between p-3 px-6">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                        Rainn1nigDay
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-4xl text-sm px-4 py-2"
                            >
                                Profile
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-black hover:bg-gray-200"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white me-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-4xl text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-black border-1 dark:text-white border-blue-700 hover:bg-blue-800 hover:text-white font-medium rounded-4xl text-sm px-4 py-2 text-center"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
