import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    // ฟังการเปลี่ยนแปลงของ localStorage และอัพเดตสถานะ
    useEffect(() => {
        const checkToken = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkToken);

        // เริ่มต้นตรวจสอบค่า token เมื่อโหลดหน้า
        checkToken();

        return () => {
            window.removeEventListener("storage", checkToken);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
