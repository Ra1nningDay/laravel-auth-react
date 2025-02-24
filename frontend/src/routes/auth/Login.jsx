import { useState } from "react";
import Logo from "../../assets/logo-brand.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const sendLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                { email, password }
            );

            console.log("Login Successful", response);

            localStorage.setItem("token", response.data.token);

            navigate("/");
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full h-screen flex-1 flex-col items-center justify-center lg:px-8 dark:bg-gray-900">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                onSubmit={sendLogin}
                                method="POST"
                                className="space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-gray-500"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md cursor-pointer bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                Not a member?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-gray-500"
                                >
                                    Create your Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
