import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
    let location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }
    return (
        <>
            <footer className="bg-white shadow-sm  dark:bg-gray-800">
                <div className="w-full mx-auto p-3 px-6 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023 All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link
                                to="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Licensing
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}
