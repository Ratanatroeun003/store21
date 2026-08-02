"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-red-500/10 p-4 rounded-full text-red-500 mb-4 text-3xl">
                ⚠️
            </div>
            <h2 className="text-xl font-bold mb-2">
                មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server
            </h2>
            <p className="text-gray-400 text-sm max-w-md mb-6">
                {error.message ||
                    "សូមពិនិត្យមើលការភ្ជាប់ Network ឬព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។"}
            </p>
            <button
                onClick={() => reset()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
                ព្យាយាមម្តងទៀត (Try Again)
            </button>
        </div>
    );
}
