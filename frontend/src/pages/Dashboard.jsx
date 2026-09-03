import { useState } from "react";

import FileUpload from "../components/FileUpload";
import ExtractButton from "../components/ExtractButton";
import ResultView from "../components/ResultView";

import { extractPDF } from "../services/api";

function Dashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleExtract = async () => {
        if (!selectedFile) {
            setError("Please select a PDF file.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await extractPDF(selectedFile);

            setSections(data.sections || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to extract the document."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold">
                        PDF Extraction Dashboard
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <FileUpload
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />

                    <div className="mt-6">
                        <ExtractButton
                            loading={loading}
                            onClick={handleExtract}
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 mt-4">
                            {error}
                        </p>
                    )}

                </div>

                <div className="mt-8">
                    <ResultView
                        loading={loading}
                        sections={sections}
                    />
                </div>

            </main>

        </div>
    );
}

export default Dashboard;