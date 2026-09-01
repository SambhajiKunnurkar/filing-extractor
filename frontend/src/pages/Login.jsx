import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

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
                    className="border w-full mt-8 p-3 rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full mt-4 p-3 rounded-lg"
                />

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 p-3 rounded-lg"
                >

                    Login

                </button>

            </div>

        </div>

    );

}