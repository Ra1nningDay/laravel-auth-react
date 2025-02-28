import "../App.css";
import Home from "../routes/home";
import Dashboard from "../routes/Dashboard";
import Login from "../routes/auth/Login";
import Register from "../routes/auth/Register";
import Profile from "../routes/Profile";
import { Routes, Route } from "react-router-dom";

export default function Main() {
    return (
        <>
            <main className="dark:bg-gray-900 dark:text-white flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
        </>
    );
}
