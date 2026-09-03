import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        PDF Extractor
                    </h1>

                    <p className="text-center text-gray-500 mt-2 mb-8">
                        Upload filings and extract structured data
                    </p>

                    <LoginForm />

                </div>
            </div>
        </div>
    );
}

export default Login;