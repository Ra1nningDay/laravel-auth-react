import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import { Navbar } from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
