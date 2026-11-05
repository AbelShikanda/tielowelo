import { Link } from '@inertiajs/react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    user: { name: string; email: string };
    onMenuToggle?: () => void;
}

export default function Header({ user, onMenuToggle }: HeaderProps) {
    const [showingUserDropdown, setShowingUserDropdown] = useState(false);

    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuToggle}
                        className="mr-3 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none sm:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-2 text-xl font-bold text-gray-800"
                    >
                        <div className="h-8 w-8 rounded-full bg-travel-600 flex items-center justify-center text-white text-sm font-bold">
                            T
                        </div>
                        <span>Tielowelo</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                        aria-label="Notifications"
                    >
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    <div className="relative inline-block">
                        <button
                            onClick={() => setShowingUserDropdown((p) => !p)}
                            className="flex items-center gap-2 rounded-full bg-gray-100 p-1 text-gray-700 focus:outline-none hover:bg-gray-200"
                        >
                            <UserCircle className="h-8 w-8" />
                            <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                            <svg
                                className="ml-1 h-4 w-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {showingUserDropdown && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-gray-100 py-1 z-20">
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                >
                                    <UserCircle className="h-5 w-5 mr-2" /> Profile
                                </Link>
                                <div className="border-t border-gray-100"></div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
                                >
                                    Sign out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showingUserDropdown && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowingUserDropdown(false)}
                />
            )}
        </header>
    );
}
