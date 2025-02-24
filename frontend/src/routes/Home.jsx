import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        // ตรวจสอบ token จาก localStorage (หรือจากที่อื่น ๆ ตามที่คุณเก็บ)
        const token = localStorage.getItem("token");

        if (!token) {
            // หากไม่มี token ให้เปลี่ยนเส้นทางไปยังหน้า login
            navigate("/login");
        } else {
            // ถ้ามี token ก็สามารถตรวจสอบต่อได้ เช่น เช็คว่า token หมดอายุหรือไม่
            console.log("Token found:", token);
        }
    }, [navigate]);

    return (
        <>
            <h1>hello</h1>
        </>
    );
}

export default Home;
