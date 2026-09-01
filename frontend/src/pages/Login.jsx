import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    // Dummy credentials
    const DUMMY_EMAIL = "admin@example.com";
    const DUMMY_PASSWORD = "admin123";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-10 w-96">
                <h1 className="text-3xl font-bold text-center">
                    PDF Extractor
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Compliance Portal
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full mt-8 p-3 rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full mt-4 p-3 rounded-lg"
                />

                {error && (
                    <p className="text-red-500 text-sm mt-3">{error}</p>
                )}

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 p-3 rounded-lg"
                >
                    Login
                </button>

                <div className="mt-6 text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
                    <p><strong>Demo Credentials</strong></p>
                    <p>Email: admin@example.com</p>
                    <p>Password: admin123</p>
                </div>
            </div>
        </div>
    );
}