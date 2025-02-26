import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token:", token);

        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const loginSuccess = sessionStorage.getItem("loginSuccess");
        if (loginSuccess) {
            toast.success("Welcome to the home page!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                sessionStorage.removeItem("loginSuccess"); // Clear login success flag
            }, 3000);
        }
    });

    return (
        <>
            <ToastContainer />
        </>
    );
}

export default Home;
