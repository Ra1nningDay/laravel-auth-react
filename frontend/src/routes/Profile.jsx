import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
    });
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.newPassword) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            // ส่งคำขอไปยัง API เพื่อเปรียบเทียบรหัสเดิม
            const response = await axios.post(
                "http://127.0.0.1:8000/api/profile/password-check",
                { password: formData.password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            console.log(response.data.success);
            if (response.data.success === true) {
                // หากรหัสเดิมถูกต้อง ให้ทำการเปลี่ยนรหัสใหม่
                await axios.put(
                    "http://127.0.0.1:8000/api/profile/reset-password", // endpoint สำหรับเปลี่ยนรหัส
                    { password: formData.newPassword },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Password reset successfully!");
                setFormData({ ...formData, password: "", newPassword: "" });
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Current password is incorrect.");
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getProfile();
        }
    }, []);

    const getProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://127.0.0.1:8000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
            setFormData({ name: res.data.name, email: res.data.email });
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://127.0.0.1:8000/api/profile",
                { name: formData.name, email: formData.email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProfile();
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
        <div className="container mx-auto mb-12">
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

            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 dark:text-black">
                    Reset Password
                </h1>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
                    </div>
                ) : (
                    user && (
                        <form onSubmit={handlePasswordReset}>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label className="font-semibold dark:text-black">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="border text-black border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold dark:text-black">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
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
