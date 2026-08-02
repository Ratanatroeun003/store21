import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-100 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-amber-500 mb-2">
                404 - Not Found
            </h1>
            <p className="text-gray-400 mb-4">
                រកមិនឃើញទិន្នន័យ ឬទំព័រដែលប្អូនកំពុងស្វែងរកឡើយ!
            </p>
            <Link
                href="/admin"
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                ត្រឡប់ទៅ Dashboard
            </Link>
        </div>
    );
}
