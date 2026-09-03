function ResultView({ loading, sections }) {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-center text-gray-500">
                    Extracting content...
                </p>
            </div>
        );
    }

    if (!sections || sections.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-center text-gray-500">
                    No extracted data available.
                </p>
                <p className="text-center text-sm text-gray-400 mt-2">
                    Upload a PDF and click <strong>Extract</strong> to view the
                    extracted headings and content.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow border border-gray-200 p-6"
                >
                    <h2 className="text-xl font-bold text-blue-700 mb-3">
                        {section.heading}
                    </h2>

                    <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                        {section.text}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ResultView;