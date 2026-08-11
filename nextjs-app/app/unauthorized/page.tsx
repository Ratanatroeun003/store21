// app/unauthorized/page.tsx
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-600 mb-2">
                    401 - Unauthorized
                </h1>
                <p className="text-gray-600 mb-6">
                    ការផ្ទៀងផ្ទាត់បរាជ័យ! អ្នកគ្មានសិទ្ធិចូលប្រើប្រាស់ប្រព័ន្ធ
                    Admin នេះឡើយ។
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}
