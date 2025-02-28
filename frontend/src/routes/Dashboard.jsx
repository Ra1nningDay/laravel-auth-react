import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role != "admin") {
            navigate("/");
        }
    }, []);

    return <>Hello</>;
}

export default Dashboard;
