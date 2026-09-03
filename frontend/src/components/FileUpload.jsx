function FileUpload({ selectedFile, setSelectedFile }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please select a PDF file.");
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    return (
        <div className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF
                </label>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded-lg p-3
                               file:mr-4 file:py-2 file:px-4
                               file:border-0 file:rounded-md
                               file:bg-blue-600 file:text-white
                               file:cursor-pointer
                               hover:file:bg-blue-700"
                />
            </div>

            {selectedFile && (
                <div className="rounded-lg border border-green-300 bg-green-50 p-4">
                    <p className="text-sm text-green-700">
                        <span className="font-semibold">Selected File:</span>{" "}
                        {selectedFile.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        Size: {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            )}

        </div>
    );
}

export default FileUpload;