import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Please enter email and password.");
            return;
        }

        setError("");

        // Dummy login
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
                Login
            </button>

        </form>
    );
}

export default LoginForm;