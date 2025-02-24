import "../App.css";
import Home from "../routes/home";
import Login from "../routes/auth/Login";
import Register from "../routes/auth/Register";
import { Routes, Route } from "react-router-dom";

export default function Main() {
    return (
        <>
            <main className="dark:bg-gray-900 dark:text-white flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </>
    );
}
