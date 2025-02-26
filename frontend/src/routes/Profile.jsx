import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getProfile();
            console.log(localStorage.getItem("token"));
        }
    }, [navigate]);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://127.0.0.1:8000/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
            setFormData({ name: res.data.name, email: res.data.email }); //Store data that come from API Fetch
        } catch (error) {
            console.error("error", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://127.0.0.1:8000/api/auth/profile/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsEditing(false);
            getProfile();
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("error", error);
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
                {user && (
                    <div className="">
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
