import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-lg">
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
                </div>
            </div>
        </nav>
    );
}
