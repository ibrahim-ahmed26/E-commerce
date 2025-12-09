export default function ErrorGlobal() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    404 Page Not Found
                </h2>
            </div>
        </div>
    );
}