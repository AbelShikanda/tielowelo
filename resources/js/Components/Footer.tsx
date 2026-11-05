export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p className="leading-6">
                        &copy; {new Date().getFullYear()} Tielowelo. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
