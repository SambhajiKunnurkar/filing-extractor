function ExtractButton({ loading, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className={`
                w-full py-3 rounded-lg font-semibold text-white transition
                ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }
            `}
        >
            {loading ? "Extracting..." : "Extract"}
        </button>
    );
}

export default ExtractButton;