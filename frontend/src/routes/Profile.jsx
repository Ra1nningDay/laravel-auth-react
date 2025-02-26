import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isLoading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getProfile();
        }
    }, []); // ดึงข้อมูลโปรไฟล์เมื่อ component ถูก mount

    const getProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://127.0.0.1:8000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data); // ตั้งค่า user
            setFormData({ name: res.data.name, email: res.data.email }); // ตั้งค่า formData
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false); // ตั้ง isLoading เป็น false เมื่อข้อมูลโหลดเสร็จ
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://127.0.0.1:8000/api/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getProfile(); // รีเฟรชข้อมูลโปรไฟล์
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto">
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 dark:text-black">
                    Profile
                </h1>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
                    </div>
                ) : (
                    user && (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label className="font-semibold dark:text-black">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border text-black border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold dark:text-black">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border text-black border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Save Change
                            </button>
                        </form>
                    )
                )}
            </div>
        </div>
    );
}

export default Profile;
