import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    to="/"
                    class="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Rainn1nigDay
                    </span>
                </Link>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link
                        to="/login"
                        class="text-white me-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
